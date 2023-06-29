const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")


class MovieNotesController {
  async create(request, response) {
    const { title, description, movie_rate, tags } = request.body
    const { user_id } = request.params
    // [user] =  get the first index value of array 
    const [user] = await knex("users").where({ id: user_id })
    if (!user) {
      throw new AppError('User not found', 404)
    } else {
      // [moviesNotes]  get the first index value of array
      const [moviesNotes] = await knex("movies_notes").insert(
        {
          title, description, movie_rate, user_id
        }
      )
      console.log(moviesNotes);
      const listTags = tags.map(tag => {
        return {
          user_id,
          tag_name: tag,
          movie_notes_id: moviesNotes
        }
      })

      await knex("movie_tags").insert(listTags)
      return response.json({
        "status": "SUCCESS",
        message: `The movie note of the movie ${title} has been created =)`
      })
    }

  }
}


module.exports = MovieNotesController