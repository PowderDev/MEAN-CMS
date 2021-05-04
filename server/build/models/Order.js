"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var orderSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            cost: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        ref: 'users',
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
});
var Order = mongoose_1.model('orders', orderSchema);
exports.default = Order;
