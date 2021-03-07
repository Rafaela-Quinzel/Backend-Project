import express from "express"
import { PlaylistController } from "../PlaylistController"


export const playlistRouter = express.Router()

const playlistController = new PlaylistController()

playlistRouter.post("/create", playlistController.createPlaylist)
playlistRouter.get("/", playlistController.getUserPlaylists)
playlistRouter.get("/:id", playlistController.getPlaylistById)
playlistRouter.put("/track", playlistController.addTrackToPlaylist)
playlistRouter.delete("/remove/:id", playlistController.delPlaylistById)