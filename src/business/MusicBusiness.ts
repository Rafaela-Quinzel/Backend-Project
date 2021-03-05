
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { Validator } from "../services/Validator"
import { MusicDatabase } from "../data/MusicDatabase"
import { Genre, Music, MusicInputDTO, MusicOutputDTO } from "./entities/Music"
import { NotFoundError } from "./errors/NotFoundError"
import { InvalidInputError } from "./errors/InvalidInputError"



export class MusicBusiness {
   
    constructor(
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private validator: Validator
    ) { }



    async createMusic(token: string, input: MusicInputDTO) {

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

    async getMusics(token: string): Promise<MusicOutputDTO[]> {

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

    async getMusicById(token: string, id: string): Promise<Music> {

        try {

            this.authenticator.getData(token)

            const music: Music = await this.musicDatabase.selectMusicById(id)

            if (!music) {
                throw new InvalidInputError("Music not found")
            }

            return music

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
}