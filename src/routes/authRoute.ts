import express from "express";
const router = express.Router();
const authController = require("../controller/authController")
const {requireAuth, checkUser} = require("../middleware/authmiddleware") 


const app = express();

router.get("/", authController.home_GET)

router.get("/login", authController.login_GET)

router.post("/login", authController.login_POST)

router.get("/signup", authController.signup_GET)

router.post("/signup", authController.signup_POST)

router.get("/logout", authController.logout_GET)

 router.get("/urlshrinker", requireAuth, checkUser , authController.urlShrinker_GET)

 router.post("/shortUrls", authController.shorturls_POST)

 router.get("/:shortUrl", authController.shorturls_GET)

 router.all("*", authController.allOtherRoutes_GET)



module.exports = router;