import { BaseDatabase } from "./BaseDataBase"
import { Music } from "../business/entities/Music"
import { MySqlError } from "../business/errors/MySqlError"
import { GenreDatabase } from "./GenreDatabase"



export class MusicDatabase extends BaseDatabase {

    private genreDataBase = new GenreDatabase()


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

            await this.genreDataBase.insertMusicGenres(music.getGenre(), music.getId())


        } catch (error) {
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
                const genres = await this.genreDataBase.selectGenreByMusic(music.id)

                musics.push(Music.toMusicModel(music, genres))
            }

            return musics

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }


    public async selectMusicById(id: string, userId: string): Promise<Music> {

        try {

            const musicResult = await this.getConnection()
                .select("*")
                .where({ id })
                .and
                .where({ user_id: userId })
                .from(this.TABLES_NAMES.musics)

            const genres = await this.genreDataBase.selectGenreByMusic(id)

            return Music.toMusicModel(musicResult[0], genres)

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }


    public async deleteMusic(id: string): Promise<void> {

        try {

            await this.getConnection().raw(`
            DELETE 
            FROM ${this.TABLES_NAMES.playlists_tracks}
            WHERE music_id = '${id}';
        `)

            await await this.getConnection().raw(`
               DELETE 
               FROM ${this.TABLES_NAMES.music_genre}
               WHERE music_id = '${id}';
            `)

            await this.getConnection().raw(`
                DELETE 
                FROM ${this.TABLES_NAMES.musics}
                WHERE id = '${id}';
            `)

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }


    public async deleteMusicFromPlaylist(music_id: string, playlist: string[]): Promise<void> {

        try {

            await this.getConnection().raw(`
               DELETE 
               FROM ${this.TABLES_NAMES.playlists_tracks}
               WHERE music_id = "${music_id}"
               AND playlist_id= "${playlist}"
            `)

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }
}