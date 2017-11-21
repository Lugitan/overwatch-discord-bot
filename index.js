const oversmash = require('oversmash');
const express = require('express');
var cors = require('cors')

const app = express();
const PORT = 3001;

app.use(cors())

app.listen(PORT, () => {
  console.log("App running on port: ", PORT);
})

app.get("/", (req, res) => {
  const ow = oversmash.default()
  ow.playerStats('Lugitan-2628', 'eu').then(player => {
    res.send(player);
  })
})
