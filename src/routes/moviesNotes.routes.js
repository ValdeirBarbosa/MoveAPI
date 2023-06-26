const { Router } = require("express")
const MoviesNotesController = require("../controllers/MoviesNotesController")

const moviesNotesRoute = Router();

const moviesNotesController = new MoviesNotesController()

moviesNotesRoute.get("/:id_user", moviesNotesController.create)


module.exports = moviesNotesRoute