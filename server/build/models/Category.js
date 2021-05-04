"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageSrc: {
        type: String,
        default: 'https://avatanplus.ru/files/resources/mid/577e401d99b8d155c52a73be.png'
    },
    user: {
        ref: 'users',
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
});
var Category = mongoose_1.model('categories', categorySchema);
exports.default = Category;
