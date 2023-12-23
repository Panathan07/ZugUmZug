// node imports
const http = require('http');
const express = require('express');
const cors = require('cors')
const fs = require("fs");

// javascript imports
const Game = require('./gameComponents/game.js');
const getUUID = require("./utilityFunctions/getUUID")

// setting variables
const port = 3000;
const game = new Game(6)
const usedUUIDs = JSON.parse(fs.readFileSync("./UUID.json"));

// building app
const app = express();

// app configurations
app.use(express.json())
app.use(cors())

// routers

app.get("/game/state", (req, res) => {
    try {
        let json = game.jsonResponse()
        res.status(200).json(json);
    } catch (err) {
        res.status(500);
    }
})

app.get("/game/start", (req, res) => {
    try {
        game.start();
        res.status(200).json(game.jsonResponse());
    } catch (err) {
        res.status(500);
    }
})

app.get("/game/end", (req, res) => {
    try {
        game.end();
        res.status(200).json(game.jsonResponse());
    } catch (err) {
        res.status(500);
    }
})

app.get("/game/unique-random-user-ID", (req, res) => {
    try {
        let uuid = getUUID(usedUUIDs.UUIDs);
        fs.writeFileSync("./UUID.json", JSON.stringify(usedUUIDs))
        res.status(200).json({ "uuid": uuid })
    } catch (err) {
        res.status(500);
    }
})

app.get("/teams", (req, res) => {
    try {
        res.status(200).json(game.jsonTeamResponse())
    } catch (err) {
        res.status(500);
    }
})




// app listens on port
app.listen(port, () => console.log(`server started on http://localhost:${port}`));

module.exports = game
