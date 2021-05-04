"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controllers/auth");
var router = express_1.Router();
router.route('/login').post(auth_1.login);
router.route('/register').post(auth_1.register);
exports.default = router;
