"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
