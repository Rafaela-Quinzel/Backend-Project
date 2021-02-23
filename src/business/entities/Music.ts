export class Music {
    constructor(
        private id: string,
        private title: string,
        private author: string,
        private date: Date,
        private file: string,
        private genre: Genre[],
        private album: string,
        public user_id: string
    ) { }


    public getId(): string {
        return this.id
    }

    public getTitle(): string {
        return this.title
    }

    public getAuthor(): string {
        return this.author
    }

    public getDate(): Date {
        return this.date
    }

    public getFile(): string {
        return this.file
    }

    public getGenre(): Genre[] {
        return this.genre
    }

    public getAlbum(): string {
        return this.album
    }

    public getUserId(): string {
        return this.user_id
    }

    public setTitle(title: string) {
        this.title = title
    }

    public setAuthor(author: string) {
        this.author = author
    }

    public setDate(date: Date) {
        this.date = date
    }

    public setFile(file: string) {
        this.file = file
    }

    public setGenre(genre: Genre[]) {
        this.genre = genre
    }

    public setAlbum(album: string) {
        this.album = album
    }

    public setUserId(user_id: string) {
        this.user_id = user_id
    }

    public static toMusic(music: any, genres: Genre[]): Music {
        return music && new Music(
            music.id,
            music.title,
            music.author,
            music.data,
            music.file,
            genres,
            music.album,
            music.user_id
        )
    }
}

export interface Genre {
    id: string,
    name: string
}

export interface MusicInputDTO {
    title: string,
    author: string,
    file: string,
    genre: string[],
    album: string
}

export interface MusicOutputDTO {
    id: string,
    title: string,
    author: string,
    date: number,
    file: string,
    genre: string[],
    album: string,
    userId: string
}



