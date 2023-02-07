import * as express from "express";
import Workshop from "../models/workshop";

export class WorkshopController {

    getAllWorkshops(req: express.Request, res: express.Response) {
        Workshop.find({}, (err, workshop) => {
            if(err) console.log(err);
            else res.json(workshop);
        });
    }

    signupParticipant(req: express.Request, res: express.Response) {
        Workshop.updateOne(
            {"_id": req.body._id},
            {
                "$push":
                {
                    "participants":
                    {
                        "username": req.body.username,
                        "status": "new"
                    }
                }
            },
            (err, w) => {
                if(err) console.log(err);
                else res.json({"message": "Succesful signup for workshop."});
            }
        )
    }

    cancelSignup(req: express.Request, res: express.Response) {
        Workshop.updateOne(
            {"_id": req.body._id},
            {
                "$pull":
                {
                    "participants":
                    {
                        "username": req.body.username
                    }
                }
            },
            (err, w) => {
                if(err) console.log(err);
                else{
                    if (req.body.status === "active") {
                        Workshop.updateOne(
                            {"_id": req.body._id},
                            {
                                "$inc":
                                {
                                    "available_spots": 1
                                }
                            },
                            (err, w) => {
                                if(err) console.log(err);
                                else{
                                    res.json({"message": "Succesful cancellation for workshop."});
                                }
                            }
                        )
                    }
                    else {
                        res.json({"message": "Succesful cancellation for workshop."});
                    }
                }
            }
        )
    }

}