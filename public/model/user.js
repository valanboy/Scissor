"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.default.Schema({ email: {
        type: String,
        required: true,
        lowercase: true,
        Unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 6
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcryptjs_1.default.genSalt();
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        console.log("password is hashed just before saving this user!");
        next();
    }
    catch (error) {
        console.log(error);
    }
});
const user = mongoose_1.default.model('user', UserSchema);
module.exports = user;
