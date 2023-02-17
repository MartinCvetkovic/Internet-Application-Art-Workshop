import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/login").post(
    (req, res) => new UserController().login(req, res)
);

userRouter.route("/register").post(
    (req, res) => new UserController().register(req, res)
);

userRouter.route("/getOrganisation").post(
    (req, res) => new UserController().getOrganisation(req, res)
);

userRouter.route("/changePassword").post(
    (req, res) => new UserController().changePassword(req, res)
);

userRouter.route("/updateUser").post(
    (req, res) => new UserController().updateUser(req, res)
);

userRouter.route("/getAllUsers").post(
    (req, res) => new UserController().getAllUsers(req, res)
);

userRouter.route("/accept").post(
    (req, res) => new UserController().accept(req, res)
);

userRouter.route("/reject").post(
    (req, res) => new UserController().reject(req, res)
);

userRouter.route("/changeType").post(
    (req, res) => new UserController().changeType(req, res)
);

userRouter.route("/sendMail").post(
    (req, res) => new UserController().sendMail(req, res)
);

userRouter.route("/getUserByEmail").post(
    (req, res) => new UserController().getUserByEmail(req, res)
);

export default userRouter;
