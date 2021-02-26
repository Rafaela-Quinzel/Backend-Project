import * as jwt from "jsonwebtoken"


export class Authenticator {

    private defaultExpiresIn: string | number = isNaN(Number(process.env.JWT_EXPIRES_IN)) ? process.env.JWT_EXPIRES_IN! : Number(process.env.JWT_EXPIRES_IN)
    
    public generateToken = (
        input: AuthenticationData,
        expiresIn: string | number = this.defaultExpiresIn

    ):  string => {
        return jwt.sign(
            input,
            process.env.JWT_KEY as string,
            { expiresIn }
        )
    }

    public getData = (token: string): AuthenticationData => {

        const payload = jwt.verify(token, process.env.JWT_KEY as string) as AuthenticationData
        const result = {
            id: payload.id
        }

        return result
    }
}

interface AuthenticationData {
    id: string
}