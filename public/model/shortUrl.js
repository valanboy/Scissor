"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shortid_1 = __importDefault(require("shortid"));
const shorturlSchema = new mongoose_1.default.Schema({
    full: {
        type: String
    },
    short: {
        type: String,
        required: true,
        default: shortid_1.default.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    useremail: {
        type: String
    }
});
const shortUrl = mongoose_1.default.model('shortUrl', shorturlSchema);
module.exports = shortUrl;
