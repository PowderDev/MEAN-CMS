"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var order_1 = require("../controllers/order");
var router = express_1.Router();
router.route('/').get(passport_1.default.authenticate('jwt', { session: false }), order_1.getAll);
router.route('/').post(passport_1.default.authenticate('jwt', { session: false }), order_1.create);
exports.default = router;
