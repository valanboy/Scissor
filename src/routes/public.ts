import express from "express";
const router = express.Router();

const app = express();

router.get("/", (req, res)=>{
    res.render("index", {title: "home page"})
}) 

router.get("/login", (req, res)=>{
    res.render('login&registration', {title: "login",
layout:"./layouts/loginLayout"
})
})


module.exports = router;