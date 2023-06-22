require("express-async-errors");
const database = require("./database/sqlite");
const AppError = require("./utils/AppError");
const express = require('express');

const routes = require("./routes");

const app = express();
app.use(express.json());


app.use(routes);
database();

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }
  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error."


app.get("/message/:id/:user", (request, response) => {
  const { id, user } = request.params
  response.send(`Hello World! ID:${id} User: ${user}`)
})

app.get("/dolar", (request, response) => {
  const { us, amount } = request.query

  response.send(`U$:${us}* ${amount} =R$${us * amount}`)
});
const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
