import { Request, Response } from "express"
import { MusicInputDTO, MusicOutputDTO } from "../business/entities/Music"
import { AddTrackInputDTO, Playlist, PlaylistInputDTO } from "../business/entities/Playlist"
import { MusicBusiness } from "../business/MusicBusiness"
import { PlaylistBusiness } from "../business/PlaylistBusiness"
import { MusicDatabase } from "../data/MusicDatabase"
import { PlaylistDatabase } from "../data/PlaylistDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { Validator } from "../services/Validator"



const playlistBusiness = new PlaylistBusiness(
    new MusicDatabase(),
    new PlaylistDatabase(),
    new IdGenerator(),
    new Authenticator(),
    new Validator()
)

export class PlaylistController {

    public async createPlaylist(req: Request, res: Response): Promise<void> {

        try {

            const token = req.headers.authorization as string

            const input: PlaylistInputDTO = {
                title: req.body.title,
                subtitle: req.body.subtitle
            }

            await playlistBusiness.createPlaylist(token, input)

            res.status(201).send("Playlist created successfully")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })

        }
    }


    public async addTrackToPlaylist(req: Request, res: Response): Promise<void> {

        try {

            const token = req.headers.authorization as string

            const input: AddTrackInputDTO = {
                id: req.params.id,
                playlist_id: req.params.playlist_id
            }

            await playlistBusiness.addTrackToPlaylist(token, input)

            res.status(200).send("Track added successfully")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })

        }
    }


    public async getPlaylistById(req: Request, res: Response) {

        try {

            const token = req.headers.authorization as string

            const id = req.params.id

            const result = await playlistBusiness.getPlaylistById(token, id)

            res.status(201).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })

        }
    }

    public async delMusicById(req: Request, res: Response) {

        try {

            const token  = req.headers.authorization as string

            const id = req.params.id 

            await playlistBusiness.deletePlaylistById(id, token)

            res.status(200).send("Playlist deleted")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }
}