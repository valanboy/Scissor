"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//connect to urls db
const DBUrls = process.env.DBUrls;
const connectToMongoDBUrls = async () => {
    try {
        mongoose_1.default.connect(DBUrls);
        mongoose_1.default.connection.on('connected', () => {
            console.log('Connected to MongoDBUrls successfully');
        });
    }
    catch (error) {
        mongoose_1.default.connection.on('error', (err) => {
            console.log('Error connecting to MongoDBUrlss', err);
        });
    }
};
module.exports = connectToMongoDBUrls;
