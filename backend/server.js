// node imports
const fs = require("fs");
const http = require('http');
const express = require('express');
var cors = require('cors')

// javascript imports
const Game = require('./game-components/game.js');
const getUUID = require("./utilityFunctions/getUUID")
// setting variables
const port = 3000;
const game = new Game(4)
const corsOptions = {
    origin: "*",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    
}
const usedUUIDs = JSON.parse(fs.readFileSync("./UUID.json"));
// building app
const app = express();

// app configurations
app.use(express.json()) 
app.use(cors(corsOptions))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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

app.get("/teams", (req, res) => {
    try {
        res.status(200).json(game.jsonTeamResponse())
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
app.get("/teams/:ip/:team", (req, res) => {
    try {
        game.addIP(req.params.ip, req.params.team);
        res.status(200).json({stat:"hello"});
    } catch {
        res.status(500);
    }
})


// app listens on port
app.listen(port, () => console.log(`server started on http://localhost:${port}`));
