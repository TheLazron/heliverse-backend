import express, { Router } from "express";
import { createTeam, getTeamByID } from "../controllers/teamController";

const teamRouter: Router = express.Router();

teamRouter.get("/teams/:id", getTeamByID);
teamRouter.post("/teams", createTeam);

export default teamRouter;
