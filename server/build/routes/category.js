"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var upload_1 = __importDefault(require("../middleware/upload"));
var category_1 = require("./../controllers/category");
var router = express_1.Router();
router.route('/').get(passport_1.default.authenticate('jwt', { session: false }), category_1.getAll);
router.route('/:id').get(category_1.getById);
router.route('/:id').delete(category_1.remove);
router.route('/').post(passport_1.default.authenticate('jwt', { session: false }), upload_1.default.single('image'), category_1.create);
router.route('/:id').put(passport_1.default.authenticate('jwt', { session: false }), upload_1.default.single('image'), category_1.update);
exports.default = router;
