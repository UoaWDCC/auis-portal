"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 40,
        minLength: 1,
    },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
