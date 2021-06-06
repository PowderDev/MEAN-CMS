"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var positionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories',
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
});
var Position = mongoose_1.model('positions', positionSchema);
exports.default = Position;
