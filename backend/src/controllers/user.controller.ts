import * as express from "express";
import { Mailer } from "../mailer/mailer";
import Organisation from "../models/organisation";
import User from "../models/user"

export class UserController{

    sendMail(req: express.Request, res: express.Response) {
        (new Mailer()).sendMail(req.body.to, req.body.subject, req.body.text, req.body.html).catch(console.error); ;
    }

    getUserByEmail(req: express.Request, res: express.Response) {
        let email = req.body.email;

        User.findOne({"email": email}, (err, user) => {
            if (err) console.log(err);
            else {
                if(user != null)
                    res.json(user);
                else
                    res.json({"message": "Non-existent email."});
            };
        });
    }

    setTempPassword(req: express.Request, res: express.Response) {
        let email = req.body.email;

        User.findOneAndUpdate(
            {"email": email},
            {
                "$set":
                {
                    "tempPass": req.body.tempPass,
                    "tempDate": req.body.tempDate
                }
            },
            (err, user) =>
            {
                if (err) console.log(err);
                else {
                    if(user != null)
                        res.json(user);
                    else
                        res.json({"message": "Non-existent email."});
                };
            }
        );
    }

    getAllUsers(req: express.Request, res: express.Response) {
        User.find({}, (err, user) => {
            if (err) console.log(err);
            else {
                if(user != null)
                    res.json(user);
                else
                    res.json({"message": "No users."})
            };
        });
    }

    login(req: express.Request, res: express.Response) {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({"username": username, "password": password}, (err, user) => {
            if (err) console.log(err);
            else {
                if(user != null)
                    res.json(user);
                else
                    res.json({"message": "Wrong username or password."});
            };
        });
    }

    tempLogin(req: express.Request, res: express.Response) {
        let username = req.body.username;
        let tempPass = req.body.tempPass;

        User.findOne({"username": username, "tempPass": tempPass}, (err, user) => {
            if (err) console.log(err);
            else {
                if(user != null)
                    res.json(user);
                else
                    res.json({"message": "Wrong username or password."});
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
                            tempPass:   null,
                            tempDate:   null,
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
                                    res.status(200).json({"message": "User and organisation registration request sent."});
                                }).catch(err => {
                                    res.status(400).json({"message": "Error inserting organisation."});
                                });
                            }
                            else {
                                res.status(200).json({"message": "User registration request sent."});
                            }
                        }).catch(err => {
                            res.status(400).json({"message": "Error inserting user."});
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
                    res.json({"message": "Nonexistent organisation for user."});
            };
        });
    }
    
    changePassword(req: express.Request, res: express.Response) {
        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        User.findOne({"username": username, "password": oldPassword}, (err, user) => {
            if (err) console.log(err);
            else {
                if(user == null){
                    res.json({"message": "Incorrect old password."});
                    return;
                }
                User.updateOne({"username": username}, {"$set": {"password": newPassword}}, (err, user) => {
                    if (err) console.log(err);
                    else res.json({"message": "Password changed successfully"});
                });
            };
        });
    }

    updateUser(req: express.Request, res: express.Response) {
        let oldEmail    = req.body.oldEmail;
        let firstname   = req.body.firstname;
        let lastname    = req.body.lastname;
        let username    = req.body.username;
        let phone       = req.body.phone;
        let email       = req.body.email;
        let image       = req.body.image;

        User.findOne({"email": email}, (err, usr) => {
            if (err) console.log(err);
            else {
                if(usr != null && oldEmail !== email){
                    res.json({"message": "Email already in use."});
                    return;
                }

                User.updateOne(
                    {"username": username},
                    {"$set": {
                        "firstname" : firstname,
                        "lastname"  : lastname,
                        "phone"     : phone,
                        "email"     : email,
                        "image"     : image
                    }},
                    (resp) => {
                        if (err) console.log(err);
                        else res.json({"message": "Update successful."});
                    }
                );
            }
        });
    }

    accept(req: express.Request, res: express.Response) {
        User.findOneAndUpdate(
            {"username": req.body.username},
            {
                "$set":
                {
                    "status" : "active"
                }
            },
            (err, usr) =>
            {
                if (err) console.log(err);
                else res.json({"message": "Update successful."});
            }
        );
    }

    reject(req: express.Request, res: express.Response) {
        User.findOneAndUpdate(
            {"username": req.body.username},
            {
                "$set":
                {
                    "status" : "inactive"
                }
            },
            (err, usr) =>
            {
                if (err) console.log(err);
                else res.json({"message": "Update successful."});
            }
        );
    }

    changeType(req: express.Request, res: express.Response) {
        User.findOneAndUpdate(
            {"username": req.body.username},
            {
                "$set":
                {
                    "type" : req.body.type
                }
            },
            (err, usr) =>
            {
                if (err) console.log(err);
                else res.json({"message": "Update successful."});
            }
        );
    }
}
