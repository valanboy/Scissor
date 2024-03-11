"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const expressLayout = require('express-ejs-layouts');
const auth = require("./routes/auth");
const admin = require("./routes/admin");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//static files
app.use(express_1.default.static('public assets'));
app.use('/css', express_1.default.static(__dirname + "public assets/css"));
app.use('/imgs', express_1.default.static(__dirname + "public assets/imgs"));
//initializing express-ejs-layouts
app.use(expressLayout);
//express router
app.use("/", auth);
app.use("/", admin);
//showing express-layouts where to find the layout inside the views folder
app.set('layout', './layouts/layout.ejs');
//setting our view engine to ejs
app.set('view engine', 'ejs');
//routing to the default homepage
app.get("/", (req, res) => {
    res.render("index", { title: "home page" });
});
//making our app come alive
app.listen(port, () => {
    console.log(`server started at port https://localhost/${port}`);
});
