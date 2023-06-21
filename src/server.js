const express = require('express');

const app = express();

app.post("/", (request, response) => {

  response.send(`You've requested a POST method`)
})


const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
