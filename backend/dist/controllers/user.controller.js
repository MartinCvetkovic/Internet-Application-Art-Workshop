"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const organisation_1 = __importDefault(require("../models/organisation"));
const user_1 = __importDefault(require("../models/user"));
class UserController {
    login(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        user_1.default.findOne({ "username": username, "password": password }, (err, user) => {
            if (err)
                console.log(err);
            else {
                if (user != null)
                    res.json(user);
                else
                    res.json({ "message": "Nepostojeci korisnik sa zadatim kredencijalima." });
            }
            ;
        });
    }
    register(req, res) {
        let user = new user_1.default({
            username: req.body.username,
            password: req.body.password,
            firtsname: req.body.firtsname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            image: req.body.image,
            type: req.body.type,
            status: req.body.status
        });
        user.save().then(user => {
            if (user.type === "organiser") {
                let organisation = new organisation_1.default({
                    user: req.body.username,
                    name: req.body.name,
                    address: req.body.address,
                    reg_number: req.body.reg_number
                });
                organisation.save().then(org => {
                    res.status(200).json({ "message": "User and organisation added." });
                }).catch(err => {
                    res.status(400).json({ "message": "Error inserting organisation." });
                });
            }
            else {
                res.status(200).json({ "message": "User added." });
            }
        }).catch(err => {
            res.status(400).json({ "message": "Error inserting user." });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map