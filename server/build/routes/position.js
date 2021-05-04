"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var position_1 = require("../controllers/position");
var router = express_1.Router();
router.route('/:categoryId').get(passport_1.default.authenticate('jwt', { session: false }), position_1.getByCategoryId);
router.route('/').post(position_1.create);
router.route('/:id').delete(position_1.remove);
router.route('/:id').put(position_1.update);
exports.default = router;
