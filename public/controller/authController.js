"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.login_GET = (req, res) => {
    res.render('login&registration', { title: "login",
        layout: "./layouts/loginLayout"
    });
};
