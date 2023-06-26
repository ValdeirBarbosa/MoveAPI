const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")


class MovieNotesController {
  async create(request, response) {
    const { title, description, movie_rate } = request.body
    const { user_id } = request.params
    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
    if(!user){
      throw new AppError('User not found',404)
    }else{
      await database.run("INSERT INTO movies_notes (title, description, movie_rate, user_id) VALUES (?,?,?,?)",
        [title, description, movie_rate, user_id])
        return response.json({ user_id })
    }
   
  }
}


module.exports = MovieNotesController