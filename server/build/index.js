"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var mongoose_1 = __importDefault(require("mongoose"));
var keys_1 = __importDefault(require("./config/keys"));
var url = keys_1.default.dbUrl || '';
mongoose_1.default.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function () { return console.log('MongoDB successfully connected'); })
    .catch(function (err) { return console.log(err); });
app_1.default.listen(keys_1.default.PORT, function () { return console.log("Server is running on port " + keys_1.default.PORT); });
