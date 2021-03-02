import { SignupInputDTO, LoginInputDTO, User } from "./entities/User"
import { UserDatabase } from "../data/UserDataBase"
import { IdGenerator } from "../services/IdGenerator"
import { HashManager } from "../services/HashManager"
import { Authenticator } from "../services/Authenticator"
import { InvalidInputError } from "./errors/InvalidInputError"
import { Validator } from "../services/Validator"
import { NotFoundError } from "./errors/NotFoundError"
import { MySqlError } from "./errors/MySqlError"
import { BaseError } from "./errors/BaseError"



export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private validator: Validator
    ) { }


    async createUser(user: SignupInputDTO) {

        try {

            if (!user.email || !user.name || !user.nickname || !user.password) {
                throw new InvalidInputError("Invalid input to signUp")
            }

            if (user.email.indexOf("@") === -1) {
                throw new InvalidInputError("Invalid email format")
            }

            if (user.password && user.password.length < 6) {
                throw new InvalidInputError("Password should have more than 6 digits")
            }


            const userId = this.idGenerator.generate()


            const hashPassword = await this.hashManager.hash(user.password)

            await this.userDatabase.insertUser(
                User.toUserModel({
                    ...user,
                    id: userId,
                    password: hashPassword
                })
            )

            const accessToken = this.authenticator.generateToken({ id: userId })

            return accessToken

        } catch (error) {
            if (error.statusCode === 409) {
                const errorInfo = MySqlError.duplicateEntryHandler(error.message)
                throw new MySqlError(errorInfo.statusCode, errorInfo.message)
            } else {
                throw new Error(error.message)
            }
        }
    }



    async authUserByEmail(input: LoginInputDTO) {

        try {

            const { email, password } = input
            this.validator.validateEmptyProperties(input)
            this.validator.validatePassword(password)

            const userFromDB = await this.userDatabase.selectUserByEmail(email)

            const user = userFromDB.getNickname()

            if (!userFromDB)
                throw new NotFoundError("Invalid input to login")

            const hashCompare = await this.hashManager.compare(password, userFromDB.getPassword())


            if (email.indexOf("@") === -1) {
                throw new InvalidInputError("Invalid email format")
            }

            if (!hashCompare) {
                throw new InvalidInputError("Invalid password")
            }

            const accessToken = this.authenticator.generateToken({ id: userFromDB.getId() })

            const result = {
                accessToken,
                user: {
                    nickname: user
                }
            }

        
            return result

        } catch (error) {
            throw new Error(error.message)
        }
    }
}