// node imports
const fs = require("fs");
const http = require('http');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

// javascript imports
const Game = require('./gameComponents/game.js');
const { handleUserID, userIDInTeam } = require("./utilityFunctions/userIDHandler.js");
const JSONStorage = require("./gameComponents/JSONStorage.js");



// setting variables
const port = 3000;
const game = new Game(4)
const corsOptions = {
    origin: "*",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
const userIDFilePath = "./UserIDs.json";
const userIDStorageLayout = {
    "UserIDs": []
}
const userIDStorage = new JSONStorage(`${userIDFilePath}`, userIDStorageLayout, "UserIDs");

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
app.get("/userID/instantiate", (req, res) => {
    try {
        let incomingUserID = req.query.userID;
        let response = handleUserID(incomingUserID, userIDStorage, game.getTeams())
        res.status(200).json(response);
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

app.get("/teams/members/exists", (req, res) => {
    try {
        let userID = req.query.userID;
        let teams = game.getTeams();
        let exists = userIDInTeam(userID, teams)
        res.status(200).json({ "userExists": exists })
    } catch (err) {
        res.status(500);
    }
})

app.post("/teams/members/add", (req, res) => {
    try {
        const team = req.body.team;
        const userID = req.body.userID;
        const teams = game.getTeams();

        teams[team].addMember(userID)
        // console.log(team, userID)
        res.status(200).json(teams)
    } catch {
        res.status(500);
    }
})

/*TODO: 
    - frontend sammelt userID von localstorage (Wert oder null)
    - frontend sendet http Request an backend 
    - backend generiert neue User Id, wenn keine vorhanden und fügt sie der json hinzu
    - backend schaut, ob User Id schon vorhanden 
    - backend sendet json zurück mit userId und ob sie existert



*/


// app listens on port
app.listen(port, () => console.log(`server started on http://localhost:${port}`));
