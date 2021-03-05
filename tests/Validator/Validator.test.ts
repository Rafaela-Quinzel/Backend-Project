import { SignupInputDTO } from "../../src/business/entities/User"
import { Validator } from "../../src/services/Validator"


describe ('Testing validateEmptyProperties', () => {

    test('Should return 422 error for missing properties', async () => {

        expect.assertions(2)

        const input: SignupInputDTO = {
            name: "",
            email: "teste@email.com",
            nickname: "testezinho",
            password: "123123"
        }

        try {
            const validator = new Validator()
            validator.validateEmptyProperties(input)
    
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toContain(`The field 'name' is missing`)
        }
    })
})


describe('Testing validatePassword', () => {

    test('Should return 406 error for password length lesser than 6 characters', () => {
        
        expect.assertions(2)

        try {
            const password: string = '123'
            const validator = new Validator()
            validator.validatePassword(password)

        } catch (error) {
            expect(error.statusCode).toBe(406);
            expect(error.message).toEqual(`Password must be at least 6 characters in length`)
        }
    })
})