const express = require('express');

const app = express();

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
