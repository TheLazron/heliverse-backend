import express, { Router } from "express";
import {
  createTeam,
  getAllTeams,
  getTeamByID,
} from "../controllers/teamController";

const teamRouter: Router = express.Router();

teamRouter.get("/teams", getAllTeams);
teamRouter.get("/teams/:id", getTeamByID);
teamRouter.post("/teams", createTeam);

export default teamRouter;
