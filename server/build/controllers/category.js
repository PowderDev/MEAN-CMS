"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.remove = exports.getById = exports.getAll = void 0;
var Category_1 = __importDefault(require("../models/Category"));
var Position_1 = __importDefault(require("../models/Position"));
var ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, categories, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                return [4 /*yield*/, Category_1.default.find({ user: userId })];
            case 1:
                categories = _b.sent();
                res.status(200).json(categories);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                ErrorHandler_1.default(err_1, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, category, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Category_1.default.findById(id)];
            case 1:
                category = _a.sent();
                res.status(200).json(category);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                ErrorHandler_1.default(err_2, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getById = getById;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Category_1.default.findByIdAndRemove(id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, Position_1.default.findOneAndRemove({ category: id })];
            case 2:
                _a.sent();
                res.status(200).json({ success: true });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                ErrorHandler_1.default(err_3, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, name_1, file, category, err_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                name_1 = req.body.name;
                file = req.file ? req.file.path : '';
                category = new Category_1.default({ name: name_1, user: userId, imageSrc: file });
                return [4 /*yield*/, category.save()];
            case 1:
                _b.sent();
                res.status(200).json(category);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                ErrorHandler_1.default(err_4, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, file, toUpdate, category, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                file = req.file ? req.file.path : '';
                toUpdate = file ? __assign(__assign({}, req.body), { imageSrc: file }) : req.body;
                return [4 /*yield*/, Category_1.default.findByIdAndUpdate(id, toUpdate, { new: true })];
            case 1:
                category = _a.sent();
                res.status(200).json(category);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                ErrorHandler_1.default(err_5, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
