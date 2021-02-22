import { BaseDatabase } from "./BaseDatabase"
import { User } from "../model/User"



export class UserDatabase extends BaseDatabase {

    public async createUser(user: User): Promise<void> {

        try {
            await this.getConnection()
                .insert({
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    nickname: user.getNickname(),
                    password: user.getPassword()
                })
                .into(this.TABLES_NAMES.users)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


    public async getUserByEmail(email: string): Promise<User> {

        try {

            const result = await this.getConnection()
                .select("*")
                .from(this.TABLES_NAMES.users)
                .where({ email })

            return User.toUserModel(result[0])

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}