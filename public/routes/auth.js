"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController = require("../controller/authController");
const app = (0, express_1.default)();
router.get("/login", authController.login_GET);
router.post("/login", (req, res) => {
});
router.post("/signup", (req, res) => {
});
module.exports = router;
