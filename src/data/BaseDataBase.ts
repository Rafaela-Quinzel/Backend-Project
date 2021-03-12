import Knex from "knex"
import knex from "knex"
import dotenv from "dotenv"

dotenv.config()


export abstract class BaseDatabase {

    private static connection: Knex | null = null


    protected TABLES_NAMES = {
        users: "Users_FULLSTACK",
        musics: "Musics_FULLSTACK",
        genres: "Genre_FULLSTACK",
        music_genre: "Music_Genre_FULLSTACK",
        playlists: "Playlists_FULLSTACK",
        playlists_tracks: "Playlist_tracks_FULLSTACK"
    }

    protected getConnection(): Knex {

        if (!BaseDatabase.connection) {

            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                },

            })
        }

        return BaseDatabase.connection
    }


    public static async destroyConnection(): Promise<void> {

        if (BaseDatabase.connection) {
            await BaseDatabase.connection.destroy()
            BaseDatabase.connection = null
        }
    }
}

