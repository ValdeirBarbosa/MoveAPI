const AppError = require("../utils/AppError")
const sqliteConnection  =require("../database/sqlite")

class MovieNotesController{
  async create(request, response){
    const { title, description, movie_rate } = request.body
    const {user_id} = request.param
    const database = await sqliteConnection()

    const dataReturn =  await database.get("SELECT * FROM users")
return response.json(dataReturn)
  }
}


module.exports = MovieNotesController