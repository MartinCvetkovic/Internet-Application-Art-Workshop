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

workshopRouter.route("/sendComment").post(
    (req, res) => new WorkshopController().sendComment(req, res)
);

workshopRouter.route("/deleteComment").post(
    (req, res) => new WorkshopController().deleteComment(req, res)
);

workshopRouter.route("/editComment").post(
    (req, res) => new WorkshopController().editComment(req, res)
);

workshopRouter.route("/sendMessage").post(
    (req, res) => new WorkshopController().sendMessage(req, res)
);

workshopRouter.route("/sendMessageOwner").post(
    (req, res) => new WorkshopController().sendMessageOwner(req, res)
);

workshopRouter.route("/newWorkshop").post(
    (req, res) => new WorkshopController().newWorkshop(req, res)
);

workshopRouter.route("/editWorkshop").post(
    (req, res) => new WorkshopController().editWorkshop(req, res)
);

workshopRouter.route("/resolveSignup").post(
    (req, res) => new WorkshopController().resolveSignup(req, res)
);

workshopRouter.route("/deleteWorkshop").post(
    (req, res) => new WorkshopController().deleteWorkshop(req, res)
);

export default workshopRouter;
