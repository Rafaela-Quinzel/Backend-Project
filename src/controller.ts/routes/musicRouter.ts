import express from "express"
import { MusicController } from "../MusicController"


export const musicRouter = express.Router()

const musicController = new MusicController()

musicRouter.post("/create", musicController.createMusic)
musicRouter.get("/", musicController.getMusics)
musicRouter.get("/:id", musicController.getMusicById)
musicRouter.get("/search", musicController.getMusicByAuthorOrTitle)
musicRouter.get('/genres', musicController.getAllGenres)
musicRouter.put("/playlist/:id", musicController.addToPlaylist)
musicRouter.delete("/delete/:id", musicController.delMusicById)
musicRouter.delete("/playlist", musicController.removeMusicFromPlaylist)
