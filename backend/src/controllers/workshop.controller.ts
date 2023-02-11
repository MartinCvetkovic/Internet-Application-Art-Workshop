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

    like(req: express.Request, res: express.Response) {
        Workshop.updateOne(
            {"_id": req.body._id},
            {
                "$push":
                {
                    "likes": req.body.username
                }
            },
            (err, w) => {
                if(err) console.log(err);
                else{
                    res.json({"message": "Successfuly liked."});
                }
            }
        )
    }

    unlike(req: express.Request, res: express.Response) {
        Workshop.updateOne(
            {"_id": req.body._id},
            {
                "$pull":
                {
                    "likes": req.body.username
                }
            },
            (err, w) => {
                if(err) console.log(err);
                else{
                    res.json({"message": "Successfuly unliked."});
                }
            }
        )
    }

    sendComment(req: express.Request, res: express.Response) {
        Workshop.updateOne(
            {"_id": req.body._id},
            {
                "$push":
                {
                    "comments":
                    {
                        "username": req.body.username,
                        "date": req.body.date,
                        "text": req.body.text
                    }
                }
            },
            (err, w) => {
                if(err) console.log(err);
                else{
                    res.json({"message": "Successfuly commented."});
                }
            }
        )
    }

    deleteComment(req: express.Request, res: express.Response) {
        Workshop.updateOne(
            {"_id": req.body._id},
            {
                "$pull":
                {
                    "comments":
                    {
                        "username": req.body.username,
                        "date": req.body.date
                    }
                }
            },
            (err, w) => {
                if(err) console.log(err);
                else{
                    res.json({"message": "Successfuly deleted comment."});
                }
            }
        )
    }

    editComment(req: express.Request, res: express.Response) {
        Workshop.findOneAndUpdate(
            {"_id": req.body._id},
            {
                "$set":
                {
                    "comments.$[comment].text": req.body.text
                }
            },
            {
                arrayFilters:
                [
                    {
                        "comment.username": req.body.username,
                        "comment.date": req.body.date
                    }
                ]
            },
            (err, w) => {
                if(err) console.log(err);
                else{
                    res.json({"message": "Successfuly edited the comment."});
                }
            }
        )
    }

    sendMessage(req: express.Request, res: express.Response) {
        Workshop.findOne(
            {
                "_id": req.body._id
            },
            {},
            {
                arrayFilters:
                [
                    {
                        "chats.$.0.username": req.body.username
                    }
                ]
            },
            (err, w) => {
                if(err) console.log(err);
                else{
                    if (w === null) {
                        Workshop.findOneAndUpdate(
                            {
                                "_id": req.body._id
                            },
                            {
                                "$push":
                                {
                                    "chats":
                                    [
                                        {
                                            "username": req.body.username,
                                            "date": req.body.date,
                                            "text": req.body.text
                                        }
                                    ]
                                }
                            },
                            (err, w) => {
                                if(err) console.log(err);
                                else{
                                    Workshop.findById(req.body._id, (err, w) => {
                                        res.json(w);
                                    });
                                }
                            }
                        );
                    }
                    else {
                        Workshop.findOneAndUpdate(
                            {
                                "_id": req.body._id
                            },
                            {
                                "$push":
                                {
                                    "chats.$[chat]":
                                    {
                                        "username": req.body.username,
                                        "date": req.body.date,
                                        "text": req.body.text
                                    }
                                }
                            },
                            {
                                arrayFilters:
                                [
                                    {
                                        "chat.0.username": req.body.username
                                    }
                                ]
                            },
                            (err, w) => {
                                if(err) console.log(err);
                                else{
                                    Workshop.findById(req.body._id, (err, w) => {
                                        res.json(w);
                                    });
                                }
                            }
                        );
                    }
                }
            }
        )
    }

    
    sendMessageOwner(req: express.Request, res: express.Response) {
        Workshop.findOne(
            {
                "_id": req.body._id
            },
            {},
            {
                arrayFilters:
                [
                    {
                        "chats.$.0.username": req.body.username
                    }
                ]
            },
            (err, w) => {
                if(err) console.log(err);
                else{
                    if (w !== null) {
                        Workshop.findOneAndUpdate(
                            {
                                "_id": req.body._id
                            },
                            {
                                "$push":
                                {
                                    "chats.$[chat]":
                                    {
                                        "username": req.body.owner,
                                        "date": req.body.date,
                                        "text": req.body.text
                                    }
                                }
                            },
                            {
                                arrayFilters:
                                [
                                    {
                                        "chat.0.username": req.body.username
                                    }
                                ]
                            },
                            (err, w) => {
                                if(err) console.log(err);
                                else{
                                    Workshop.findById(req.body._id, (err, w) => {
                                        res.json(w);
                                    });
                                }
                            }
                        );
                    }
                }
            }
        )
    }
}