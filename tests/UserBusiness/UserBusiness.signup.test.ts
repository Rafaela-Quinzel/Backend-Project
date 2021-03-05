import { SignupInputDTO } from "../../src/business/entities/User"
import { UserBusiness } from "../../src/business/UserBusiness"
import { Validator } from "../../src/services/Validator"

const userDatabase = { insertUser: jest.fn() } as any

const idGenerator = {
    generate: jest.fn(() => "id")
}

const hashManager = {
    hash: jest.fn((password: string) => "hashPassword")
}

const authenticator = { generateToken: jest.fn(() => 'token') } as any

const validator = { validateEmptyProperties: jest.fn(), validatePassword: jest.fn() }

const userBusiness = new UserBusiness(
    userDatabase as any,
    idGenerator as any,
    hashManager as any,
    authenticator as any,
    validator as any
)

describe.skip("Signup Test Flow", () => {

    test("Should return error when no email", async () => {

        expect.assertions(1)

        const user = {
            name: "teste",
            nickname: "testezinho",
            password: "123123"

        } as SignupInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid input to signup")
        }
    })


    test("Should return error when no name", async () => {

        expect.assertions(1)

        const user = {
            name: "",
            email: "teste@email.com",
            nickname: "testezinho",
            password: "123123"

        } as SignupInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid input to signup")
        }
    })


    test("Should return error when no nickname", async () => {

        expect.assertions(1)

        const user = {
            name: "teste",
            email: "teste@email.com",
            password: "123123"

        } as SignupInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid input to signup")
        }
    })


    test("Should return error when no password", async () => {

        expect.assertions(1)

        const user = {
            name: "teste",
            email: "teste@email.com",
            nickname: "testezinho"

        } as SignupInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid input to signup")
        }
    })


    test("Should return error when wrong email format", async () => {

        expect.assertions(1)

        const user = {
            name: "teste",
            email: "testeemail.com",
            nickname: "testezinho",
            password: "123123"

        } as SignupInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid email format")
        }
    })


    test("Should return error when wrong password format", async () => {

        expect.assertions(1)

        const user = {
            name: "teste",
            email: "teste@email.com",
            nickname: "testezinho",
            password: "123"
        } as SignupInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("The password must contain more than 6 digits")
        }
    })


    test("Should return token", async () => {

        expect.assertions(7)

        const user = {
            name: "teste",
            email: "teste@email.com",
            nickname: "testezinho",
            password: "123123"

        } as SignupInputDTO

        const result = await userBusiness.createUser(user)

        expect(result).toBe("token")
        expect(idGenerator.generate).toHaveBeenCalled()
        expect(idGenerator.generate).toHaveReturnedWith('id')
        expect(hashManager.hash).toHaveBeenCalled()
        expect(hashManager.hash).toHaveReturnedWith('hashPassword')
        expect(authenticator.generateToken).toHaveBeenCalled()
        expect(authenticator.generateToken).toHaveReturnedWith('token')
    })

})


