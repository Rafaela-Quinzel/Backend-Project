import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { Validator } from "../services/Validator"
import { MusicDatabase } from "../data/MusicDatabase"
import { Genre, Music, MusicInputDTO, MusicOutputDTO } from "./entities/Music"
import { NotFoundError } from "./errors/NotFoundError"
import { InvalidInputError } from "./errors/InvalidInputError"
import { GenreDatabase } from "../data/GenreDatabase"



export class MusicBusiness {

    constructor(
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private validator: Validator
    ) { }



    public async createMusic(token: string, input: MusicInputDTO) {

        try {

            const tokenData = this.authenticator.getData(token)

            const { title, author, file, genre, album } = input
            this.validator.validateEmptyProperties(input)

            const id: string = this.idGenerator.generate()

            const today: Date = new Date()

            const genres: Genre[] = genre.map(genre => {
                return {
                    id: this.idGenerator.generate(),
                    name: genre
                }
            })

            const music: Music = new Music(
                id,
                title,
                author,
                today,
                file,
                genres,
                album,
                tokenData.id
            )

     
            await this.musicDatabase.insertMusics(music)
            

            return music

        } catch (error) {
            throw new Error(error.message)
        }
    }


    public async getMusics(token: string): Promise<MusicOutputDTO[]> {

        try {

            const userData = this.authenticator.getData(token)

            const musics = await this.musicDatabase.selectMusicsByUser(userData.id)

            if (!musics) {
                throw new NotFoundError("Musics not found")
            }

            const musicsOutputDTO = musics.map((music) => {

                const genres = music.getGenre().map(genre => genre.name)

                return {
                    id: music.getId(),
                    title: music.getTitle(),
                    author: music.getAuthor(),
                    date: music.getDate(),
                    file: music.getFile(),
                    genre: genres,
                    album: music.getAlbum(),
                    user_id: music.getUserId()

                }
            })

            return musicsOutputDTO

        } catch (error) {
            throw new Error(error.message)

        }

    }


    public async getMusicById(token: string, id: string): Promise<Music> {

        try {

            const userData = this.authenticator.getData(token)

            const music: Music = await this.musicDatabase.selectMusicById(id, userData.id)

            if (!music) {
                throw new InvalidInputError("Music not found")
            }

            return music

        } catch (error) {
            throw new Error(error.message)
        }

    }


    public async getMusicByAuthorOrTitle(token: string, title: string, author: string, album: string) {

        try {

            this.authenticator.getData(token)

            if (!title && !author && !album) {
                throw new InvalidInputError("Please inform 'title', 'author' or 'album'")
            }

            let result

            if (title) {
                result = await this.musicDatabase.getMusicByProperty("title", title)

            } else if (author) {
                result = await this.musicDatabase.getMusicByProperty("author", author)

            } else {
                result = await this.musicDatabase.getMusicByProperty("album", album)
            }


            if (!result.length) {
                throw new InvalidInputError("Title, author or album not found")
            }

            return result

        } catch (error) {
            throw new Error(error.message)

        }
    }


    public async addToPlaylist(music_id: string, playlist: string[], token: string) {

        try {

            this.authenticator.getData(token)

            await this.musicDatabase.addToPlaylist(
                music_id,
                playlist
            )

            return { message: "Added to Playlist" }

        } catch (error) {
            throw new Error(error.message)
        }
    }


    public async deleteMusicById(id: string, token: string) {

        try {

            this.authenticator.getData(token)

            await this.musicDatabase.deleteMusic(id) as any

            return { message: "Music deleted" }

        } catch (error) {
            throw new Error(error.message)
        }
    }


    public async removeMusicFromPlaylist(music_id: string, playlist: string[], token: string) {

        try {

            this.authenticator.getData(token)

            await this.musicDatabase.deleteMusicFromPlaylist(music_id, playlist) as any

            return { message: "Removed from playlist" }

        } catch (error) {
            throw new Error(error.message)
        }
    }


    public async getAllGenres(): Promise<string[]> {

        try {

            const genreDatabase = new GenreDatabase()

            const genres = await genreDatabase.selectAllGenres()

            if (!genres) {
                throw new NotFoundError("No genres found")
            }

            return genres

        } catch (error) {
            throw new Error(error.message)
        }
    }
}