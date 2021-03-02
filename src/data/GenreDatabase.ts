import { Genre } from "../business/entities/Music"
import { MySqlError } from "../business/errors/MySqlError"
import { BaseDatabase } from "../data/BaseDataBase"

export class GenreDatabase extends BaseDatabase {

    private static toGenreModel = (genre: any): Genre => {
        return genre && {
            id: genre.id,
            name: genre.name,
        }
    }

    public insertMusicGenres = async (
        genres: Genre[],
        musicId: string
    ): Promise<void> => {
        try {
            for (let genre of genres) {
                await this.getConnection()(this.TABLES_NAMES.genres)
                    .insert({
                        id: genre.id,
                        name: genre.name
                    })

                await this.getConnection()(this.TABLES_NAMES.music_genre)
                    .insert({
                        music_id: musicId,
                        genre_id: genre.id
                    })
            }

        } catch (error) {
            throw new MySqlError(500, error.message);
        }
    }

    public selectGenreByMusic = async (
        musicId: string
    ): Promise<Genre[]> => {
        try {
            const genreResult = await this.getConnection().raw(`
                SELECT genre_id as id, name
                FROM ${this.TABLES_NAMES.genres}
                JOIN ${this.TABLES_NAMES.music_genre}
                ON ${this.TABLES_NAMES.genres}.id = ${this.TABLES_NAMES.music_genre}.genre_id
                WHERE ${this.TABLES_NAMES.music_genre}.music_id = '${musicId}';
            `)

            const genres: Genre[] = []

            for (let genre of genreResult[0]) {
                genres.push(GenreDatabase.toGenreModel(genre))
            }

            return genres

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }
}