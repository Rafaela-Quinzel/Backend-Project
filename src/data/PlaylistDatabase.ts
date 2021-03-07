import { BaseDatabase } from "./BaseDataBase"
import { MySqlError } from "../business/errors/MySqlError"
import { Playlist } from "../business/entities/Playlist"
import { PlaylistBusiness } from "../business/PlaylistBusiness"



export class PlaylistDatabase extends BaseDatabase {



    public async insertPlaylist(playlist: Playlist): Promise<void> {

        try {

            await this.getConnection()
                .insert({
                    id: playlist.getId(),
                    title: playlist.getTitle(),
                    subtitle: playlist.getSubtitle(),
                    date: playlist.getDate(),
                    user_id: playlist.getUserId()
                })
                .into(this.TABLES_NAMES.playlists)

        } catch (error) {
            const errorInfo = MySqlError.duplicateEntryHandler(error.message)
            throw new MySqlError(errorInfo.statusCode, errorInfo.message)
        }
    }

    public async selectUserPlaylists(userId: string): Promise<Playlist[]> {

        try {

            const result = await this.getConnection()
                .select("*")
                .where({ user_id: userId })
                .from(this.TABLES_NAMES.playlists)

            const playlists: Playlist[] = []

            for(let playlist of result) {
                playlists.push(Playlist.toPlaylistModel(playlist))
            }

            return playlists

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }


    public async selectPlaylistById(id: string, userId: string): Promise<Playlist> {

        try {

            const playlistResult = await this.getConnection()
                .select("*")
                .where({ id })
                .and
                .where({ user_id: userId })
                .from(this.TABLES_NAMES.playlists)

            return Playlist.toPlaylistModel(playlistResult[0])

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }


    public async insertTrackToPlaylist(musicId: string, playlistId: string) {

        try {

            await this.getConnection()
                .insert({
                    music_id: musicId ,
                    playlist_id: playlistId  
                })
                .into(this.TABLES_NAMES.playlists_tracks)

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }


    public async deletePlaylist(id: string): Promise<void> {

        try {

            await await this.getConnection().raw(`
               DELETE 
               FROM ${this.TABLES_NAMES.playlists_tracks}
               WHERE playlist_id = '${id}';
            `)

            await this.getConnection().raw(`
                DELETE 
                FROM ${this.TABLES_NAMES.playlists}
                WHERE id = '${id}';
            `)

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }
}