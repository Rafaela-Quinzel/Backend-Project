import { LoginInputDTO, User } from "../../src/business/entities/User"
import { NotFoundError } from "../../src/business/errors/NotFoundError"
import { UserBusiness } from "../../src/business/UserBusiness"



const userDatabase = { 
    selectUserByEmail: jest.fn(async (email: string) => {
        if (email === "teste@email.com") {
            return User.toUserModel({
                id: "id_usuario",
                name: "teste",
                email,
                nickname: "testezinho",
                password: "123123"
            })
        } else {
            throw new NotFoundError(`Unable to found user witch email: ${email}`)

        }
    })} 

const idGenerator = {
    generate: jest.fn(() => "id")
}

const hashManager = {
    hash: jest.fn((password: string) => "hashPassword"),
    compare: jest.fn((text: string, hash: string) => text === "123123" ? true : false)
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

describe.skip("Login Test Flow", () => {

    test("Should return error when no user Linked to email", async () => {

        expect.assertions(3)

        const login = {
            email: "ts@email.com",
            password: "123123"

        } as LoginInputDTO

        try {
            await userBusiness.authUserByEmail(login)

        } catch (error) {
            expect(error.message).toBe(`Unable to found user witch email: ${login.email}`)
            expect(validator.validateEmptyProperties).toHaveBeenCalled()
            expect(validator.validatePassword).toHaveBeenCalled()
        }
    })


    test("Should return error when no password", async () => {

        expect.assertions(3)

        const login = {
            email: "teste@email.com",
            password: ""

        } as LoginInputDTO

        try {
            await userBusiness.authUserByEmail(login)

        } catch (error) {
            expect(error.message).toBe("Invalid password")
            expect(validator.validateEmptyProperties).toHaveBeenCalled()
            expect(validator.validatePassword).toHaveBeenCalled()
        }
    })


    test("Should return error when no email", async() => {
        
        expect.assertions(3)

        const login = {
            email: "",
            password: "123123"

        } as LoginInputDTO

        try { 
            await userBusiness.authUserByEmail(login)

        } catch(error) {
            expect(error.message).toBe(`Unable to found user witch email: ${login.email}`)
            expect(validator.validateEmptyProperties).toHaveBeenCalled()
            expect(validator.validatePassword).toHaveBeenCalled()
        }
    })


    test("Should return error when password wrong", async() => {
        
        expect.assertions(5)

        const login = {
            email: "teste@email.com",
            password: "123123123"

        } as LoginInputDTO

        try { 
            await userBusiness.authUserByEmail(login)

        } catch(error) {
            expect(error.message).toBe("Invalid password")
            expect(validator.validateEmptyProperties).toHaveBeenCalled()
            expect(validator.validatePassword).toHaveBeenCalled()
            expect(hashManager.compare).toHaveBeenCalled()
            expect(hashManager.compare).toHaveReturnedWith(false)
        }
    })


    test("Should return error when wrong password format", async () => {

        expect.assertions(5)

        const login = {
            email: "teste@email.com",
            password: "123"
        } as LoginInputDTO

        try { 
            await userBusiness.authUserByEmail(login)

        } catch (error) {
            expect(error.message).toBe("Invalid password")
            expect(validator.validateEmptyProperties).toHaveBeenCalled()
            expect(validator.validatePassword).toHaveBeenCalled()
            expect(hashManager.compare).toHaveBeenCalled()
            expect(hashManager.compare).toHaveReturnedWith(false)
        }
    })


    test("Should return token", async () => {

        expect.assertions(7)

        const userLogin = {
            email: "teste@email.com",
            password: "123123"
        } as LoginInputDTO


        const result = await userBusiness.authUserByEmail(userLogin)

        expect(result).toBe("token")
        expect(validator.validateEmptyProperties).toHaveBeenCalled()
        expect(validator.validatePassword).toHaveBeenCalled()
        expect(hashManager.compare).toHaveBeenCalled()
        expect(hashManager.compare).toHaveReturnedWith(true)
        expect(authenticator.generateToken).toHaveBeenCalled()
        expect(authenticator.generateToken).toHaveReturnedWith('token')
    })

})


