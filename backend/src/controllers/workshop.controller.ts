import * as express from "express";
import Workshop from "../models/workshop";

export class WorkshopController {

    getAllWorkshops(req: express.Request, res: express.Response) {
        Workshop.find({}, (err, workshop) => {
            if(err) console.log(err);
            else res.json(workshop);
        });
    }

}