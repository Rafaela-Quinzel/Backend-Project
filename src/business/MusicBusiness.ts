
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { Validator } from "../services/Validator"
import { MusicDatabase } from "../data/MusicDatabase"
import { Genre, Music, MusicInputDTO } from "./entities/Music"



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
}