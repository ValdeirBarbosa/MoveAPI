const { hash,compare } = require("bcryptjs");
const AppError = require("../utils/AppError")
const sqliteConnection = require('../database/sqlite')

class UserController {

  async create(request, response) {
    const { name, email, password } = request.body;
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE  email =(?)", [email])

    if (checkUserExists) {
      throw new AppError(`The email ${email} is already in use`)
    }

    let hashedPasswords = await hash(password, 8)

    await database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, hashedPasswords])

    return response.status(201).json(

      {
        "status": "SUCCESS",
        message: `The user ${name} has been created `
      });
  }

  async update(request, response) {
    const { name, email, password, oldPassword } = request.body
    const { id } = request.params

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    if (!user) {
      throw new AppError("User not found", 404)
    }
    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email= (?)", [email])
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("This email is in use by other user, tou can't use it", 404)
    }

    user.name = name ?? user.name
    user.email = email ?? user.email 

    if(password && !oldPassword){
      throw new AppError("You must inform tne current password for update it",401)
    }
    if(password && oldPassword){
      const checkOldPassword = await compare(oldPassword,user.password)
     if(!checkOldPassword){
      throw new AppError("The current password mismatch, please check you current password and try again",401)
     }

     user.password = await hash(password,8)
    }
//DATETIME("now", "localtime")
    await database.run(
      `UPDATE users SET 
        name = ?,  
        email = ?, 
        password = ?,
        updated_at = DATETIME("now","LOCALTIME"
        )
        WHERE id = ?`, [user.name, user.email, user.password, user.id]
    );

    return response.status(201).json({
      "status": "SUCCESS.",
      "message": `The user ${user.name} has been updated`
    })
  }

  async index(request,response){
    const database = await sqliteConnection();
    const allSUers = await database.get("SELECT * FROM users")
    console.log(allSUers)

    response.status(201).json({allSUers})

  }
}
module.exports = UserController