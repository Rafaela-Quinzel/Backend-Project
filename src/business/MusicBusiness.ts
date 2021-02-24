
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { Validator } from "../services/Validator"
import { MusicDatabase } from "../data/MusicDatabase"
import { Genre, Music, MusicInputDTO, MusicOutputDTO } from "./entities/Music"
import { NotFoundError } from "./errors/NotFoundError"



export class MusicBusiness {

    constructor(
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private validator: Validator
    ) { }


    async createMusic(token: string, input: MusicInputDTO) {

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
    }

    async getMusics(token: string): Promise<MusicOutputDTO[]> {

        const userData = this.authenticator.getData(token)

        const musics = await this.musicDatabase.selectMusicsById(userData.id)

        if (!musics) {
            throw new NotFoundError("Musics not found")
        }

        const musicsOutputDTO = musics.map((music: any) => {
            const genres = music.getGenre().map((genre: any) => genre.name)
            return {
                id: music.id,
                title: music.title,
                author: music.author,
                date: music.date,
                file: music.file,
                genres: genres,
                album: music.album,
                user_id: music.user_id

            }
        })

        return musicsOutputDTO

    }
}