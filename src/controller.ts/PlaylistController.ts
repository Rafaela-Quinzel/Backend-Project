import { Request, Response } from "express"
import { PlaylistInputDTO } from "../business/entities/Playlist"
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

            const { playlist } = req.query as any
    
            const music_id = req.params.id as any

            const token: string = req.headers.authorization as string
            
            const result = await playlistBusiness.addTrackToPlaylist(music_id, playlist, token)

            res.status(200).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })

        }
    }


    public async getUserPlaylists(req: Request, res: Response): Promise<void> {

        try {

            const token = req.headers.authorization as string

            const result = await playlistBusiness.getUserPlaylists(token)

            res.status(200).send(result)

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

            const result = await playlistBusiness.getPlaylistById(id, token)

            res.status(201).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })

        }
    }



    public async delPlaylistById(req: Request, res: Response) {

        try {

            const token = req.headers.authorization as string

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