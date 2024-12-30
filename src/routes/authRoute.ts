import express from "express";
import rateLimit from "express-rate-limit";
const router = express.Router();
const authController = require("../controller/authController")
const {requireAuth, checkUser} = require("../middleware/authmiddleware") 


const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, //time limit of 5 minutes
    max: 4, //number of requests
    message:"😟 too many log in request, please try again in 5 minute!"

})
const limiterSignUp = rateLimit({
    windowMs: 30* 60 *1000, //time limit of 30 minutes
    max: 5, //number of requests
    message:"😟 oops!!!  too many sign up request, please try again in 30 minutes"

})

router.get("/", authController.home_GET)

router.get("/login", authController.login_GET)

router.post("/login", limiter,authController.login_POST)

router.get("/signup", authController.signup_GET)

router.post("/signup", limiterSignUp,authController.signup_POST)

router.get("/logout", authController.logout_GET)

 router.get("/urlshrinker", authController.urlShrinker_GET)

 router.post("/shortUrls", authController.shorturls_POST)

 router.get("/:shortUrl", authController.shorturls_GET)

 router.all("*", authController.allOtherRoutes_GET)



module.exports = router;