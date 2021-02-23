import { BaseDatabase } from "./BaseDataBase"
import { Music } from "../business/entities/Music"
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
}