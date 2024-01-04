// node imports
import express, { Express, Request, Response, Application } from "express";
// import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// javascript imports
import Game from "#game-components/game";
import { handleUserID } from "#utility-functions/userIDHandler";
import JSONStorage from "#game-components/JSONStorage";
import User, { UserProps, UserReplaceKeyMap } from "#game-components/user";

// setting variables
const port = 3000;
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// init userID storage
const userIDFilePath = "./Users.json";
const userStorage = new JSONStorage<User>(
  `${userIDFilePath}`,
  "Users",
  UserReplaceKeyMap
);
const amountTeams = 4;
const game = new Game(amountTeams, userStorage);

// building app
const app: Application = express();

// app configurations
app.use(express.json());
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routers

app.get("/game/state", (req, res) => {
  try {
    const json = { state: game.state };
    res.status(200).json(json);
  } catch (err) {
    res.status(500);
  }
});
app.get("/game/start", (req, res) => {
  try {
    game.start();
    const json = { state: game.state };
    res.status(200).json(json);
  } catch (err) {
    res.status(500);
  }
});
app.get("/game/end", (req, res) => {
  try {
    game.end();
    let json = { state: game.state };
    res.status(200).json(json);
  } catch (err) {
    res.status(500);
  }
});
app.get("/user/instantiate", (req, res) => {
  try {
    let incomingUserID = req.query.userID?.toString();
    if (incomingUserID == undefined) {
      res.status(400);
      return;
    }

    let newUser = handleUserID(incomingUserID, userStorage, game.teams);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500);
  }
});
app.get("/teams", (req, res) => {
  try {
    res.status(200).json({ teams: game.teams });
  } catch (err) {
    res.status(500);
  }
});
app.get("/teams/members/exists", (req, res) => {
  try {
    let userID = req.query.userID?.toString();
    if (userID == undefined) {
      res.send(400);
      return;
    }
    let user = game.useStorage().getByKey(UserProps.ID, userID);
    let exists = false;
    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500);
  }
});
app.post("/teams/members/add", (req, res) => {
  try {
    const team = req.body.team;
    const userID = req.body.userID;
    const teams = game.teams;

    teams[team].addMember(userID);
    // console.log(team, userID)
    res.status(200).json(teams);
  } catch {
    res.status(500);
  }
});

// app listens on port
app.listen(port, () =>
  console.log(`server started on http://localhost:${port}`)
);
