import { Request, Response } from "express"
import { MusicInputDTO } from "../business/entities/Music"
import { MusicBusiness } from "../business/MusicBusiness"
import { MusicDatabase } from "../data/MusicDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { Validator } from "../services/Validator"


const musicBusiness = new MusicBusiness(
    new MusicDatabase(),
    new IdGenerator(),
    new Authenticator(),
    new Validator()
)

export class MusicController {

    async createMusic(req: Request, res: Response): Promise<void> {

        try {

            const token = req.headers.authorization as string

            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                file: req.body.file,
                genre: req.body.genre as string[],
                album: req.body.album
            }

            await musicBusiness.createMusic(token, input)

            res.status(201).send("Music inserted successfully")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })

        } finally {
            await MusicDatabase.destroyConnection()
        }
    }
}