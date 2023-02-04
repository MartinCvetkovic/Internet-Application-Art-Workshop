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
        User.findOne({"username": req.body.username}, (err, user) => {
            if (err) console.log(err);
            else {
                if(user != null){
                    res.json({"message": "Username already in use."});
                    return;
                }

                User.findOne({"email": req.body.email}, (err, usr) => {
                    if (err) console.log(err);
                    else {
                        if(usr != null){
                            res.json({"message": "Email already in use."});
                            return;
                        }
                        
                        let user = new User({
                            username:   req.body.username,
                            password:   req.body.password,
                            firstname:  req.body.firstname,
                            lastname:   req.body.lastname,
                            phone:      req.body.phone,
                            email:      req.body.email,
                            image:      req.body.image,
                            type:       req.body.type,
                            status:     "new"
                        });

                        user.save().then(user => {
                            if(user.type === "organiser"){
                                let organisation = new Organisation({
                                    user:       req.body.username,
                                    name:       req.body.orgname,
                                    address:    (
                                                    req.body.country
                                                    + ", " + req.body.city
                                                    + ", " + req.body.postal_code
                                                    + ", " + req.body.address
                                                    + ", " + req.body.adrNumber
                                                ),
                                    reg_number: req.body.reg_number
                                });
                    
                                organisation.save().then(org => {
                                    res.status(200).json({"message": "User and organisation registration request sent."})
                                }).catch(err => {
                                    res.status(400).json({"message": "Error inserting organisation."})
                                });
                            }
                            else {
                                res.status(200).json({"message": "User registration request sent."})
                            }
                        }).catch(err => {
                            res.status(400).json({"message": "Error inserting user."})
                        });

                    };
                })
            };
        })
    }

    getOrganisation(req: express.Request, res: express.Response) {
        let username = req.body.username;

        Organisation.findOne({"user": username}, (err, org) => {
            if (err) console.log(err);
            else {
                if(org != null)
                    res.json(org);
                else
                    res.json({"message": "Nonexistent organisation for user."})
            };
        });
    }
}
