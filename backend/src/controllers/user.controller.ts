import * as express from "express";
import Organisation from "../models/organisation";
import User from "../models/user"

export class UserController{
    login(req: express.Request, res: express.Response) {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({"username": username, "password": password}, (err, user) => {
            if (err) console.log(err);
            else {
                if(user != null)
                    res.json(user);
                else
                    res.json({"message": "Wrong username or password."})
            };
        });
    }

    register(req: express.Request, res: express.Response) {
        let user = new User({
            username:   req.body.username,
            password:   req.body.password,
            firstname:  req.body.firstname,
            lastname:   req.body.lastname,
            phone:      req.body.phone,
            email:      req.body.email,
            image:      req.body.image,
            type:       req.body.type,
            status:     req.body.status
        });

        user.save().then(user => {
            if(user.type === "organiser"){
                let organisation = new Organisation({
                    user:       req.body.username,
                    name:       req.body.name,
                    address:    req.body.address,
                    reg_number: req.body.reg_number
                });
    
                organisation.save().then(org => {
                    res.status(200).json({"message": "User and organisation added."})
                }).catch(err => {
                    res.status(400).json({"message": "Error inserting organisation."})
                });
            }
            else {
                res.status(200).json({"message": "User added."})
            }
        }).catch(err => {
            res.status(400).json({"message": "Error inserting user."})
        });
    }
}
