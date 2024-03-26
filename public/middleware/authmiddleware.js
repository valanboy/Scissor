"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user = require("../model/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JwtSecret = process.env.JwtSecret;
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //check json web token exists & is verified
    if (token) {
        jsonwebtoken_1.default.verify(token, JwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect("/login");
    }
};
//check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, JwtSecret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.User = null;
                next();
            }
            else {
                console.log(decodedToken);
                let User = await user.findById(decodedToken.id);
                res.locals.User = User;
                next();
            }
        });
    }
    else {
        res.locals.User = null;
        next();
    }
};
module.exports = { requireAuth, checkUser };
