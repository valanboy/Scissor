"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user = require("../model/user");
const shortUrl = require("../model/shortUrl");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JwtSecret = process.env.JwtSecret;
//create json token
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, JwtSecret, {
        expiresIn: maxAge
    });
};
module.exports.home_GET = (req, res) => {
    res.render('index.ejs', {
        title: "homepage"
    });
};
module.exports.login_GET = (req, res) => {
    res.render('login', {
        title: "login",
        layout: "./layouts/loginLayout.ejs",
        error: ""
    });
};
module.exports.signup_GET = (req, res) => {
    res.render('registration', {
        title: "signup",
        layout: "./layouts/loginLayout.ejs",
        error: ""
    });
};
module.exports.signup_POST = async (req, res) => {
    try {
        let { email, password, username } = req.body;
        const emailAlreadyExist = await user.findOne({ email: email });
        if (emailAlreadyExist) {
            res.render('registration', {
                title: "signup",
                layout: "./layouts/loginLayout.ejs",
                error: "email already exists"
            });
        }
        else if (!emailAlreadyExist) {
            //creating a new user
            const User = await user.create({ email, username, password });
            //creating a jwt token with the call back funtion initialised a the start of the code
            const token = createToken(User._id);
            //sending the jwt token as cookie to be saved in the client browser making the req.
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
            await res.status(200).redirect('/login');
        }
    }
    catch (error) {
        // const errors = handleErrors(err)
        // res.status(400).json({ error })
        console.log(error);
    }
};
module.exports.login_POST = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email: email });
        if (!User) {
            // res.send("no user")
            res.render("login", {
                title: "login",
                layout: "./layouts/loginLayout.ejs",
                error: "user not found, please sign up"
            });
        }
        // if(!User){ res.redirect("/signup")}
        if (User) {
            const dbpassword = User.password;
            const comparedPassword = await bcryptjs_1.default.compare(password, dbpassword);
            if (User && comparedPassword === true) {
                //creating a jwt token with the call back funtion initialised a the start of the code
                const token = createToken(User._id);
                //sending the jwt token as cookie to be saved in the client browser making the req.
                res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
                console.log(email, password);
                res.redirect(`/urlshrinker?username=${encodeURIComponent(User.username)}`);
            }
            else if (user && comparedPassword === false) {
                res.render("login", {
                    title: "login",
                    layout: "./layouts/loginLayout.ejs",
                    error: "incorrect username or password"
                });
                // res.redirect("/login")
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
module.exports.urlShrinker_GET = async (req, res) => {
    // Extract the username from the query parameters
    const username = req.query.username;
    const shortUrls = await shortUrl.find();
    res.render('urlShrinker', {
        title: "url Shrinker",
        layout: "./layouts/urlshrinkerLayout.ejs",
        shortUrls: shortUrls,
        user: username
    });
};
module.exports.shorturls_POST = async (req, res) => {
    const fullUrl = req.body.fullUrl;
    const longUrlExist = await shortUrl.findOne({ full: fullUrl });
    if (longUrlExist) {
        res.redirect('/urlshrinker');
    }
    else {
        await shortUrl.create({ full: req.body.fullUrl });
        res.redirect('/urlshrinker');
    }
};
module.exports.logout_GET = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect("/");
};
module.exports.shorturls_GET = async (req, res) => {
    const username = req.query.username;
    const shortUrls = await shortUrl.find();
    if (req.body.fullUrl === null) {
        res.render('urlShrinker', {
            title: "url Shrinker",
            layout: "./layouts/urlshrinkerLayout.ejs",
            shortUrls: shortUrls,
            user: username,
            // error: "please enter your long url"
        });
    }
    const shorturl = await shortUrl.findOne({ short: req.params.shortUrl });
    if (shorturl === null)
        return res.render('404', {
            title: "404"
        });
    shorturl.clicks++;
    shorturl.save();
    res.redirect(shorturl.full);
};
module.exports.allOtherRoutes_GET = async (req, res) => {
    res.render('404', {
        title: "page not found",
        layout: "./layouts/layout.ejs"
    });
};
