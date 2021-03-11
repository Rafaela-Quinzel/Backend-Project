import { BaseDatabase } from "./BaseDataBase"
import { MySqlError } from "../business/errors/MySqlError"
import { musicsPlaylistInput, Playlist } from "../business/entities/Playlist"
import { Music } from "../business/entities/Music"
import { GenreDatabase } from "./GenreDatabase";


export class PlaylistDatabase extends BaseDatabase {

    private genreDatabase = new GenreDatabase()


    public async insertPlaylist(playlist: Playlist): Promise<void> {

        try {

            await this.getConnection()
                .insert({
                    id: playlist.getPlaylistId(),
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

            for (let playlist of result) {
                playlists.push(Playlist.toPlaylistModel(playlist))
            }

            return playlists

        } catch (error) {
            throw new MySqlError(500, error.message)
        }
    }


    public async selectPlaylistById(id: string): Promise<any | undefined> {

        try {

            const result = await this.getConnection().raw(`
              SELECT *
              FROM ${this.TABLES_NAMES.musics} mfs 
              LEFT JOIN ${this.TABLES_NAMES.music_genre} mgf 
              ON mfs.id = mgf.music_id
              LEFT JOIN ${this.TABLES_NAMES.genres} gf 
              ON mgf.genre_id = gf.id
              LEFT JOIN ${this.TABLES_NAMES.playlists_tracks} ptf 
              ON mfs.id = ptf.music_id
              WHERE ptf.playlist_id = "${id}";
            `)

            const playlist = await this.getConnection().raw(`
              SELECT * 
              FROM ${this.TABLES_NAMES.playlists}
              WHERE id = "${id}";
            `)

            return ([playlist[0], result[0]])

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }



    public async insertTrackToPlaylist(music_id: string, playlist_id: string) {

        try {

            await this.getConnection().raw(`
            INSERT INTO ${this.TABLES_NAMES.playlists_tracks}
            VALUES ("${music_id}", "${playlist_id}")
         `)

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