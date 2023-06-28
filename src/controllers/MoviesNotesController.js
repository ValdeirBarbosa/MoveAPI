const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")


class MovieNotesController {
  async create(request, response) {
    const { title, description, movie_rate, tags } = request.body
    const { user_id } = request.params
    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])


    if (!user) {
      throw new AppError('User not found', 404)
    } else {

      const moviesNotes = await knex("movies_notes").insert(
        {
          title, description, movie_rate, user_id
        }
      )

      const tagsMovie = tags.map(tag => {
        return {
          user_id: user_id,
          tag_name: tag,
          movie_notes_id: moviesNotes

        }
      })


      await knex("movie_tags").insert(tagsMovie)

      // await database.run("INSERT INTO movies_notes (title, description, movie_rate, user_id) VALUES (?,?,?,?)",
      //   [title, description, movie_rate, user_id])


      return response.json({
        "status": "SUCCESS",
        message: `The movie note of the movie ${title} has been created =)`
      })
    }

  }
}


module.exports = MovieNotesController