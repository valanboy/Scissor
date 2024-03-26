import express, {Express, Request, Response, urlencoded} from "express"
 const db = require("./db/connectdb")
 const Dburl = require("./db/dbUrl")

 import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"

const expressLayout = require('express-ejs-layouts');
const authRoute = require("./routes/authRoute")
const adminRoute = require("./routes/adminRoute")

const app:Express = express();
const port = process.env.PORT || 3000

//static files
app.use(express.static('public assets'))
app.use('/css', express.static(__dirname + "public assets/css"))
app.use('/imgs', express.static(__dirname + "public assets/imgs"))
app.use('/js', express.static(__dirname + "public assets/imgs"))


//initializing express-ejs-layouts
app.use(expressLayout)

//allows us to use json data from req(converts json data to usable js)
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());
//express router
app.use("/", authRoute)
app.use("/", adminRoute)

//showing express-layouts where to find the layout inside the views folder
app.set('layout', './layouts/layout.ejs')


//connect to db after requiring file at the top
db()
Dburl()


//setting our view engine to ejs
app.set('view engine', 'ejs')

//making our app come alive
app.listen(port, ()=>{
console.log(`server started at port https://localhost/${port}`)})