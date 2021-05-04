"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var analytics_1 = require("../controllers/analytics");
var router = express_1.Router();
router.route('/overview').get(passport_1.default.authenticate('jwt', { session: false }), analytics_1.overview);
router.route('/').get(passport_1.default.authenticate('jwt', { session: false }), analytics_1.analytics);
exports.default = router;
