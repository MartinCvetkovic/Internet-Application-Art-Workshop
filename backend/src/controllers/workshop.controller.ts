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

    newWorkshop(req: express.Request, res: express.Response) {
        let workshop = new Workshop({
            owner: req.body.owner,
            name: req.body.name,
            main_img: req.body.main_img,
            date: req.body.date,
            place: req.body.place,
            short_description: req.body.short_description,
            long_description: req.body.long_description,
            images: req.body.images,
            likes: [],
            comments: [],
            chats: [],
            available_spots: req.body.available_spots,
            participants: [],
            status: "new"
        });
        workshop.save().then(user=>{
            res.status(200).json({"message": "Workshop created successfully."});
        }).catch(err => {
            res.status(400).json({"message": "Error creating workshop."});
        });
    }
    
    editWorkshop(req: express.Request, res: express.Response) {
        
        let _id = req.body._id;
        let name = req.body.name;
        let main_img = req.body.main_img;
        let date = req.body.date;
        let place = req.body.place;
        let short_description = req.body.short_description;
        let long_description = req.body.long_description;
        let images = req.body.images;
        let available_spots = req.body.available_spots;

        Workshop.findOneAndUpdate(
            {"_id": _id},
            {
                "name": name,
                "main_img": main_img,
                "date": date,
                "place": place,
                "short_description": short_description,
                "long_description": long_description,
                "images": images,
                "available_spots": available_spots
            },
            (err, w) => {
                if (err) console.log(err);
                else res.json(w);
            }
        );
    }
    
    resolveSignup(req: express.Request, res: express.Response) {
        Workshop.findOneAndUpdate(
            {
                "_id": req.body._id
            },
            {
                "$set":
                {
                    "participants.$[p].status": req.body.status
                }
            },
            {
                arrayFilters:
                [
                    {
                        "p.username": req.body.username
                    }
                ]
            },
            (err, w) => {
                if (err) console.log(err);
                else {
                    Workshop.findById(req.body._id, (err, w) => {
                        res.json(w);
                    });
                }
            }
        )
    }
}