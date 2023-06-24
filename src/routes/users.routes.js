const { Router } = require("express");

const UserController = require("../controllers/UsersController");

const userRoutes = Router();


function myMiddleware(request, response, next) {
  console.log("YOu pass in the middleware")
  next()

}

const userController = new UserController()


userRoutes.post("/",userController.create)
userRoutes.put("/:id",userController.update)


module.exports = userRoutes