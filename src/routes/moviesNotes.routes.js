const { Router } = require("express")
const MoviesNotesController = require("../controllers/MoviesNotesController")


const moviesNotesRoute = Router();

const moviesNotesController = new MoviesNotesController()

moviesNotesRoute.post("/:user_id", moviesNotesController.create)


module.exports = moviesNotesRoute