// node imports
const http = require('http');
const express = require('express');

// javascript imports
const Game = require('./game-components/game.js');

// setting variables
const port = 3000;
const game = new Game(6)

// building app
const app = express();

// app configurations
app.use(express.json())

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


// app listens on port
app.listen(port, () => console.log(`server started on http://localhost:${port}`));