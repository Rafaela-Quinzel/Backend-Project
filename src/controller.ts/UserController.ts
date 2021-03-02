import { Request, Response } from "express"
import { SignupInputDTO, LoginInputDTO } from "../business/entities/User"
import { UserBusiness } from "../business/UserBusiness"
import { BaseDatabase } from "../data/BaseDataBase"
import { UserDatabase } from "../data/UserDataBase"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { Validator } from "../services/Validator"



const userBusiness = new UserBusiness(
    new UserDatabase(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new Validator()
)


export class UserController {

    async signup(req: Request, res: Response) {

        try {

            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const token = await userBusiness.createUser(input)

            res.status(201).send({ token })

        } catch (error) {
            res
            .status(error.statusCode || 400)
            .send({ error: error.message })
        }

        await BaseDatabase.destroyConnection()
    }


    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await userBusiness.authUserByEmail(loginData)

            res.status(200).send({ token })

        } catch (error) {
            res
            .status(error.statusCode || 400)
            .send({ error: error.message })
        }

        await BaseDatabase.destroyConnection()
    }

}