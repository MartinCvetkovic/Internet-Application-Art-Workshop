import express from "express";
import { WorkshopController } from "../controllers/workshop.controller";

const workshopRouter = express.Router();

workshopRouter.route("/getAllWorkshops").get(
    (req, res) => new WorkshopController().getAllWorkshops(req, res)
);

export default workshopRouter;
