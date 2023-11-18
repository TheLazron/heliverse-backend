import { Request, Response } from "express";
import Team from "../models/team";
import { createTeamSchema } from "../schemas/teamSchema";
import { error } from "console";
import errorResponseHandler from "../utils/errorHandler";

const getTeamByID = (req: Request, res: Response) => {
  const id = req.params.id;
  Team.findById(id)
    .populate("members")
    .then((team) => {
      if (team) {
        res.status(200).json({ team });
      } else {
        errorResponseHandler(404, res, undefined, "Team not found");
      }
    })
    .catch((error) => {
      console.error("Error retrieving team:", error);
      errorResponseHandler(500, res, error, "Internal server error");
    });
};

const createTeam = (req: Request, res: Response) => {
  const { name, members } = createTeamSchema.parse(req.body);
  Team.create({ name, members })
    .then((team) => {
      res.status(201).json({ team });
    })
    .catch((error) => {
      console.error("Error creating team:", error);
      errorResponseHandler(500, res, error, "Internal server error");
    });
};

export { getTeamByID, createTeam };
