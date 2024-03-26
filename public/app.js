"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db = require("./db/connectdb");
const Dburl = require("./db/dbUrl");
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const expressLayout = require('express-ejs-layouts');
const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//static files
app.use(express_1.default.static('public assets'));
app.use('/css', express_1.default.static(__dirname + "public assets/css"));
app.use('/imgs', express_1.default.static(__dirname + "public assets/imgs"));
app.use('/js', express_1.default.static(__dirname + "public assets/imgs"));
//initializing express-ejs-layouts
app.use(expressLayout);
//allows us to use json data from req(converts json data to usable js)
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
//express router
app.use("/", authRoute);
app.use("/", adminRoute);
//showing express-layouts where to find the layout inside the views folder
app.set('layout', './layouts/layout.ejs');
//connect to db after requiring file at the top
db();
Dburl();
//setting our view engine to ejs
app.set('view engine', 'ejs');
app.set('views', '../views');
//making our app come alive
app.listen(port, () => {
    console.log(`server started at port https://localhost/${port}`);
});
