// node imports
const fs = require("fs");
const http = require('http');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

// javascript imports
const Game = require('./gameComponents/game.js');
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
app.get("/game/unique-random-user-ID", (req, res) => {
    try {
        let uuid = getUUID(usedUUIDs.UUIDs);
        fs.writeFileSync("./UUID.json", JSON.stringify(usedUUIDs))
        res.status(200).json({ "UUID": uuid })
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

app.get("/teams/member-exists", (req, res) => {
    try {
        let userID = req.query.userID;
        let teams = game.jsonTeamResponse().teams;
        let exists = false;
        teams.map((team) => {
            if (team.hasMember(userID)) exists = true;
        })
        res.status(200).json({ "userExists": exists })
    } catch (err) {
        res.status(500);
    }
})

app.post("/teams/addMember", (req, res) => {
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


// app listens on port
app.listen(port, () => console.log(`server started on http://localhost:${port}`));
