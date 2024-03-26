"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//connect to users db
const DBUri = process.env.DBUri;
const connectToMongoDB = async () => {
    try {
        mongoose_1.default.connect(DBUri);
        mongoose_1.default.connection.on('connected', () => {
            console.log('Connected to MongoDB successfully');
        });
    }
    catch (error) {
        mongoose_1.default.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB', err);
        });
    }
};
module.exports = connectToMongoDB;
