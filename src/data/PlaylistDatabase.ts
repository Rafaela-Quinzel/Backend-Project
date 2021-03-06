import { BaseDatabase } from "./BaseDataBase"
import { MySqlError } from "../business/errors/MySqlError"
import { Playlist } from "../business/entities/Playlist"



export class PlaylistDatabase extends BaseDatabase {

   

    public async insertPlaylist(playlist: Playlist): Promise<void> {

        try {

            await this.getConnection()
                .insert({
                    id: playlist.getId(),
                    title: playlist.getTitle(),
                    author: playlist.getSubtitle(),
                    date: playlist.getDate(),
                    user_id: playlist.getUserId()
                })
                .into(this.TABLES_NAMES.playlists)

        } catch (error) {
            const errorInfo = MySqlError.duplicateEntryHandler(error.message)
            throw new MySqlError(errorInfo.statusCode, errorInfo.message)
        }
    }


    public async selectPlaylistById(id: string, userId: string): Promise<Playlist> {

        try {

            const playlistResult = await this.getConnection()
                .select("*")
                .where({ id })
                .and
                .where({ user_id: userId})
                .from(this.TABLES_NAMES.playlists)

            return Playlist.toPlaylistModel(playlistResult[0])

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }


    public async insertTrackToPlaylist(id: string, playlistId: string) {

        try {

            await this.getConnection()
            .insert({
                id: id,
                playlist_id: playlistId,
            })
            .into(this.TABLES_NAMES.playlists_tracks)

        } catch (error) {
            const errorInfo = MySqlError.duplicateEntryHandler(error.message)
            throw new MySqlError(errorInfo.statusCode, errorInfo.message)
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