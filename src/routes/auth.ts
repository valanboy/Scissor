import express from "express";
const router = express.Router();
const authController = require("../controller/authController")

const app = express();

router.get("/login",authController.login_GET)

router.post("/login", (req, res)=>{
   
})

router.post("/signup", (req, res)=>{

})


module.exports = router;