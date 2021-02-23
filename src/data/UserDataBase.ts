import { BaseDatabase } from "./BaseDataBase"
import { User } from "../business/entities/User"
import { MySqlError } from "../business/errors/MySqlError"



export class UserDatabase extends BaseDatabase {

    public async insertUser(user: User): Promise<void> {

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
            const errorInfo = MySqlError.duplicateEntryHandler(error.message)
            throw new MySqlError(errorInfo.statusCode, errorInfo.message)
        }
    }


    public async selectUserByEmail(key: string, value: string): Promise<User> {

        try {

            const result = await this.getConnection()
                .select("*")
                .from(this.TABLES_NAMES.users)
                .where({ key, value })

            return User.toUserModel(result[0])

        } catch (error) {
            console.log(error.message)
            throw new MySqlError()
        }
    }
}