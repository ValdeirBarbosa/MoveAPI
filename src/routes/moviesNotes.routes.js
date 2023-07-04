const { Router } = require("express")
const MoviesNotesController = require("../controllers/MoviesNotesController")


const moviesNotesRoute = Router();

const moviesNotesController = new MoviesNotesController()

moviesNotesRoute.post("/:user_id", moviesNotesController.create)
<<<<<<< HEAD
moviesNotesRoute.get("/:id", moviesNotesController.index)
=======
moviesNotesRoute.get("/:id", moviesNotesController.show)
moviesNotesRoute.get("/", moviesNotesController.index)


>>>>>>> 99306164b2504fe543f0f3e61cb2ec675e2bd407


module.exports = moviesNotesRoute