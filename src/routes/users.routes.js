const { Router } = require("express");

const UserController = require("../controllers/UsersController");


const userRoutes = Router();


function myMiddleware(request, response, next) {
  console.log("YOu pass in the middleware")
  next()

}

const userController = new UserController()



userRoutes.post("/",userController.create)
userRoutes.get("/",userController.index)
userRoutes.get("/:user_id",userController.show)
userRoutes.put("/:id",userController.update)
userRoutes.delete("/:id",userController.drop)


module.exports = userRoutes