import { BaseDatabase } from "./BaseDataBase"
import { Genre, Music } from "../business/entities/Music"
import { MySqlError } from "../business/errors/MySqlError"



export class MusicDatabase extends BaseDatabase {



    public async insertMusics(music: Music): Promise<void> {

        try {

            await this.getConnection()
                .insert({
                    id: music.getId(),
                    title: music.getTitle(),
                    author: music.getAuthor(),
                    date: music.getDate(),
                    file: music.getFile(),
                    album: music.getAlbum(),
                    user_id: music.getUserId()
                })
                .into(this.TABLES_NAMES.musics)

            for (let genre of music.getGenre()) {
                await this.getConnection()
                    .insert({
                        id: genre.id,
                        name: genre.name
                    })
                    .into(this.TABLES_NAMES.genres)


                await this.getConnection()
                    .insert({
                        music_id: music.getId(),
                        genre_id: genre.id
                    })
                    .into(this.TABLES_NAMES.music_genre)
            }

        } catch (error) {
            console.log(error)
            const errorInfo = MySqlError.duplicateEntryHandler(error.message)
            throw new MySqlError(errorInfo.statusCode, errorInfo.message)
        }
    }


    public selectMusicsByUser = async (
        userId: string
    ): Promise<Music[]> => {
        try {
            const musicResult = await this.getConnection()
                .select('*')
                .where({ user_id: userId })
                .from(this.TABLES_NAMES.musics)

            const musics: Music[] = []

            for (let music of musicResult) {
                const genreResult = await this.getConnection().raw(`
                    SELECT genre_id as id, name
                    FROM ${this.TABLES_NAMES.musics}
                    JOIN ${this.TABLES_NAMES.music_genre}
                    ON ${this.TABLES_NAMES.music_genre}.music_id = ${this.TABLES_NAMES.musics}.id
                    JOIN ${this.TABLES_NAMES.genres}
                    ON ${this.TABLES_NAMES.genres}.id = ${this.TABLES_NAMES.music_genre}.genre_id
                    WHERE ${this.TABLES_NAMES.musics}.id = '${music.id}'
                `)

                const genres: Genre[] = []

                for (let genre of genreResult[0]) {
                    genres.push({
                        id: genre.id,
                        name: genre.name
                    })
                }

                musics.push(Music.toMusicModel(musicResult[0], genres))

            }

            return musics

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }


    public async selectMusicById(id: string): Promise<Music> {

        try {

            const musicResult = await this.getConnection()
                .select("*")
                .where({ id })
                .from(this.TABLES_NAMES.musics)


            const genres: Genre[] = []

            const genreResult = await this.getConnection().raw(`
              SELECT genre_id as id, name
              FROM ${this.TABLES_NAMES.musics}
              JOIN ${this.TABLES_NAMES.music_genre}
              ON ${this.TABLES_NAMES.music_genre}.music_id = ${this.TABLES_NAMES.musics}.id
              JOIN ${this.TABLES_NAMES.genres}
              ON ${this.TABLES_NAMES.genres}.id = ${this.TABLES_NAMES.music_genre}.genre_id
              WHERE ${this.TABLES_NAMES.musics}.id = '${id}'
            `)

            for (let genre of genreResult[0]) {
                genres.push({
                    id: genre.id,
                    name: genre.name
                })
            }

            return Music.toMusicModel(musicResult[0], genres)

        } catch (error) {
            console.log(error)
            const errorInfo = MySqlError.duplicateEntryHandler(error.message)
            throw new MySqlError(errorInfo.statusCode, errorInfo.message)

        }
    }
}