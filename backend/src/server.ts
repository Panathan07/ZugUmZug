// node imports
import express, { Express, Request, Response, Application } from "express";
// import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

// javascript imports
import Game from "#game-components/Game";
import { handleUserID } from "#utility-functions/userIDHandler";
import JSONStorage from "#game-components/JSONStorage";
import User, { UserProps, UserReplaceKeyMap } from "#game-components/User";
import Team from "#game-components/Team";
import RoadManager from "#game-components/RoadManager";
import { RoadColor } from "#customTypes/RoadColor";
import { GameState } from "#customTypes/GameState";

// setting variables
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// init userID storage
const userIDFilePath = "/assets/Users.json";
const userStorage = new JSONStorage<User>(
  `${userIDFilePath}`,
  "Users",
  UserReplaceKeyMap
);

const roadManager = new RoadManager();

const amountTeams = 4;
const game = new Game(amountTeams, userStorage, roadManager);

// building app
const app: Application = express();

// app configurations
app.use(express.json());
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");

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
app.get("/game/results", (req, res) => {
  try {
    if (game.state !== GameState.Ended) {
      res.status(200).json({ team: null });
      return;
    }
    const json = { team: game.getResults() };
    res.status(200).json(json);
  } catch (err) {
    res.status(500);
  }
});
app.get("/game/color-card/price", (req, res) => {
  try {
    const json = game.useColorCards().getCards();
    res.status(200).json(json);
  } catch (err) {
    res.status(500);
  }
});

app.post("/game/color-card/buy", (req, res) => {
  try {
    const color = req.body.color as RoadColor;
    const teamId = req.body.teamId as number;
    const successful = game.useColorCards().buyCard(game.teams, teamId, color);
    res.status(200).json({ successful: successful });
  } catch (err) {
    res.status(500);
  }
});

app.post("/game/buyRoad", (req, res) => {
  try {
    const roadName = req.body.roadName;
    const teamId = req.body.teamId;
    const colorCard = req.body.colorCard;
    let successful = game
      .useRoads()
      .buyRoad(game.teams, teamId, roadName, colorCard);
    if (successful == null) {
      throw new Error("Road does not exist.");
    }
    res.status(200).json(successful);
  } catch (err) {
    res.status(500);
  }
});
app.get("/user/instantiate", (req, res) => {
  try {
    let incomingUserID = req.query.userID?.toString();
    if (incomingUserID == undefined) {
      incomingUserID = "";
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
app.post("/teams/members/add", (req, res) => {
  try {
    const teamName = req.body.teamName as string;
    const teamID = req.body.teamID;
    const user = req.body.user as User;
    const teams = game.teams;

    if (!game.useStorage().itemExists(user) || user == null) {
      res.status(400);
      return;
    }

    let originalUser = game.useStorage().get(user);

    if (originalUser == null) return res.status(500);

    for (const team of teams) {
      if (team.hasMember(user)) team.removeMember(user);
    }
    teams[teamID].addMember(user);
    res.status(200).json(teams);
  } catch {
    res.status(500);
  }
});

app.post("/tasks/accept", (req, res) => {
  try {
    const taskName = req.body.task;
    let teamIdString = req.body.teamId as string;
    let teamId: number;
    try {
      teamId = parseInt(teamIdString);
    } catch (err) {
      res.status(400);
      return;
    }
    const gameResponse = game.accept_task(teamId, taskName);
    console.log(gameResponse);
    if (gameResponse) {
      res.status(200).json({ outcome: 1 });
      return;
    }
  } catch {
    res.status(500).json({ errorType: 1 });
  }
});
app.post("/tasks/solve", (req, res) => {
  try {
    const solution: string = req.body.solution;
    const task: string = req.body.task;
    let teamIdString = req.body.teamId as string;
    let teamId: number;
    try {
      teamId = parseInt(teamIdString);
    } catch (err) {
      res.status(400);
      return;
    }
    console.log(solution);
    const gameResponse = game.solve_task(teamId, task, solution);

    if (gameResponse) {
      res.status(200).json({ correct: 1 });
      return;
    }
    res.status(200).json({ correct: 0 });
  } catch (err) {
    res.status(500).json({ wrong: err });
  }
});
app.get("/team/tasks", (req, res) => {
  try {
    let teamIdString = req.query.teamId as string;
    let teamId: number;
    try {
      teamId = parseInt(teamIdString);
    } catch (err) {
      res.status(400);
      return;
    }
    res.status(200).json({
      pending: game.get_rotation(teamId),
      accepted: game.get_accepted_tasks(teamId),
    });
  } catch {
    res.status(500);
  }
});
app.post("/team/tasks/rotate", (req, res) => {
  try {
    game.shuffleTasks();
    res.status(200).json({
      successful: true,
    });
  } catch {
    res.status(500);
  }
});

app.get("/team/goals", (req, res) => {
  try {
    let teamIdString = req.query.teamId as string;
    let teamId: number;
    try {
      teamId = parseInt(teamIdString);
    } catch (err) {
      res.status(400);
      return;
    }
    res.status(200).json({
      pending: game.get_goals(teamId)[0],
      accepted: game.get_goals(teamId)[1],
    });
  } catch {
    res.status(500);
  }
});
app.post("/team/goals/rotate", (req, res) => {
  try {
    let teamIdString = req.body.teamId as string;
    let teamId: number;
    try {
      teamId = parseInt(teamIdString);
    } catch (err) {
      res.status(400);
      return;
    }
    game.teams[teamId].shuffleGoals();
    res.status(200).json({ status: 1 });
    return;
  } catch {
    res.status(500);
  }
});
app.post("/team/goals/accept", (req, res) => {
  try {
    let teamIdString = req.body.teamId as string;
    let teamId: number;
    try {
      teamId = parseInt(teamIdString);
    } catch (err) {
      res.status(400);
      return;
    }
    const connection = req.body.connection as string[];
    const gameResponse = game.setGoal(teamId, connection);
    if (gameResponse) {
      res.status(200).json({ status: 1 });
      return;
    }
    res.status(500);
  } catch {
    res.status(500);
  }
});
app.post("/team/goals/check", (req, res) => {
  try {
    let teamIdString = req.body.teamId as string;
    let teamId: number;
    try {
      teamId = parseInt(teamIdString);
    } catch (err) {
      res.status(400);
      return;
    }
    const connection = req.body.connection as string[];
    const gameResponse = game.check_connection(teamId, connection);
    console.log(gameResponse);
    if (gameResponse) {
      res.status(200).json({ status: 1 });
      return;
    }
    res.status(500);
  } catch {
    res.status(500);
  }
});
app.get("/team/time", (req, res) => {
  try {
    res.status(200).json(game.time);
  } catch {
    res.status(500);
  }
});

// app listens on port
app.listen(port, () =>
  console.log(`server started on http://localhost:${port}`)
);
