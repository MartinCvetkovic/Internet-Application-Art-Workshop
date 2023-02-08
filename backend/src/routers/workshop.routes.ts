import express from "express";
import { WorkshopController } from "../controllers/workshop.controller";

const workshopRouter = express.Router();

workshopRouter.route("/getAllWorkshops").get(
    (req, res) => new WorkshopController().getAllWorkshops(req, res)
);

workshopRouter.route("/signupParticipant").post(
    (req, res) => new WorkshopController().signupParticipant(req, res)
);

workshopRouter.route("/cancelSignup").post(
    (req, res) => new WorkshopController().cancelSignup(req, res)
);

workshopRouter.route("/like").post(
    (req, res) => new WorkshopController().like(req, res)
);

workshopRouter.route("/unlike").post(
    (req, res) => new WorkshopController().unlike(req, res)
);

export default workshopRouter;
