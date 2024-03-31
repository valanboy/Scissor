"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = express_1.default.Router();
const authController = require("../controller/authController");
const { requireAuth, checkUser } = require("../middleware/authmiddleware");
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, //time limit of 5 minutes
    max: 4, //number of requests
    message: "😟 too many log in request, please try again in 5 minute!"
});
const limiterSignUp = (0, express_rate_limit_1.default)({
    windowMs: 30 * 60 * 1000, //time limit of 30 minutes
    max: 5, //number of requests
    message: "😟 oops!!!  too many sign up request, please try again in 30 minutes"
});
router.get("/", authController.home_GET);
router.get("/login", authController.login_GET);
router.post("/login", limiter, authController.login_POST);
router.get("/signup", authController.signup_GET);
router.post("/signup", limiterSignUp, authController.signup_POST);
router.get("/logout", authController.logout_GET);
router.get("/urlshrinker", requireAuth, checkUser, authController.urlShrinker_GET);
router.post("/shortUrls", authController.shorturls_POST);
router.get("/:shortUrl", authController.shorturls_GET);
router.all("*", authController.allOtherRoutes_GET);
module.exports = router;
