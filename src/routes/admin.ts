import express from "express";

const router = express.Router()

const app = express()

router.get("/admin", (req, res)=>{
    res.render("dashboard", {title:"dashboard",
    layout:"./layouts/adminLayout"})
})



module.exports = router;