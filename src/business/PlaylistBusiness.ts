import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { Validator } from "../services/Validator"
import { MusicDatabase } from "../data/MusicDatabase"
import { Music } from "./entities/Music"
import { NotFoundError } from "./errors/NotFoundError"
import { InvalidInputError } from "./errors/InvalidInputError"
import { PlaylistDatabase } from "../data/PlaylistDatabase"
import { AddTrackInputDTO, Playlist, PlaylistInputDTO } from "./entities/Playlist"



export class PlaylistBusiness {
   
    constructor(
        private musicDatabase: MusicDatabase,
        private playlistDatabase: PlaylistDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        private validator: Validator
    ) { }



    public async createPlaylist(token: string, input: PlaylistInputDTO): Promise<void> {

        try {

            const tokenData = this.authenticator.getData(token)

            const { title, subtitle } = input
            this.validator.validateEmptyProperties(input)

            const id: string = this.idGenerator.generate()

            let dayjs = require('dayjs')
            const createdAt: Date = dayjs(Date.now()).format('YYYY/MM/DD HH:mm:ss')

            const playlist: Playlist = new Playlist(
                id,
                title,
                subtitle,
                createdAt,
                tokenData.id,
            )

            await this.playlistDatabase.insertPlaylist(playlist)

        } catch (error) {
            throw new Error(error.message)
        }
    }


    public async addTrackToPlaylist(token: string, input: AddTrackInputDTO): Promise<void> {

        try {

            const tokenData = this.authenticator.getData(token)
            
            const { music_id, playlist_id } = input
            this.validator.validateEmptyProperties(input)

            const music: Music = await this.musicDatabase.selectMusicById(music_id, tokenData.id)

            if (!music) {
                throw new NotFoundError("Music not found")
            }

            const playlist: Playlist = await this.playlistDatabase.selectPlaylistById(playlist_id, tokenData.id)
            
            if (!playlist) {
                throw new NotFoundError("Playlist not found")
            }

            await this.playlistDatabase.insertTrackToPlaylist(music_id, playlist_id)


        } catch (error) {
            throw new Error(error.message)

        }

    }

    public async getUserPlaylists(token: string): Promise<Playlist[]> {

        try {

            const userData = this.authenticator.getData(token)

            const playlists = await this.playlistDatabase.selectUserPlaylists(userData.id)

            if (!playlists) {
                throw new NotFoundError("Playlist not found")
            }

            return playlists

        } catch (error) {
            throw new Error(error.message)

        }

    }

    async getPlaylistById(token: string, id: string) {

        try {

            this.authenticator.getData(token)

            const playlist = await this.playlistDatabase.selectPlaylistById(id, token)

            if (!playlist) {
                throw new InvalidInputError("Playlist not found")
            }

            return playlist

        } catch (error) {
            throw new Error(error.message)
        }

    }

    public async deletePlaylistById(id: string, token: string) {

        try {

           this.authenticator.getData(token)
           
           await this.playlistDatabase.deletePlaylist(id) as any

           return { message: "Playlist deleted" }

        } catch (error) {
            throw new Error(error.message)
        }
     }
}