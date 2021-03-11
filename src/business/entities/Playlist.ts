import { Music } from "./Music"


export class Playlist {

    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly subtitle: string,
        public readonly date: Date,
        public readonly user_id: string,
        private musics?: Music[]
    ) { }


    public getPlaylistId(): string {
        return this.id
    }

    public getTitle(): string {
        return this.title
    }

    public getSubtitle(): string {
        return this.subtitle
    }

    public getDate(): Date {
        return this.date
    }

    public getUserId(): string {
        return this.user_id
    }

    public getMusics() {
        this.musics
    }

    public setMusics(musics: Music[]) {
        this.musics = musics
    }

    public static toPlaylistModel(playlist: any) {
        return playlist && new Playlist(
            playlist.id,
            playlist.title,
            playlist.subtitle,
            playlist.date,
            playlist.user_id
        )
    }
}

export interface PlaylistInputDTO {
    title: string,
    subtitle: string,
}


export interface AddTrackInputDTO {
    music_id: string,
    playlist_id: string
}

export interface musicsPlaylist{
    musicId: string,
    playlistId: string
}

export interface musicsPlaylistInput{
    id:string,
    musicId: string,
    playlistId: string
}



