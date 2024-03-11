import express from "express"
import dotenv from "dotenv"
const expressLayout = require('express-ejs-layouts');
const auth = require("./routes/auth")
const admin = require("./routes/admin")

dotenv.config()

const app = express();
const port = process.env.PORT || 3000

//static files
app.use(express.static('public assets'))
app.use('/css', express.static(__dirname + "public assets/css"))
app.use('/imgs', express.static(__dirname + "public assets/imgs"))

//initializing express-ejs-layouts
app.use(expressLayout)

//express router
app.use("/", auth)
app.use("/", admin)

//showing express-layouts where to find the layout inside the views folder
app.set('layout', './layouts/layout.ejs')

//setting our view engine to ejs
app.set('view engine', 'ejs')


//routing to the default homepage
app.get("/", (req, res)=>{
    res.render("index", {title: "home page"})
}) 

//making our app come alive
app.listen(port, ()=>{
console.log(`server started at port https://localhost/${port}`)})