"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var moment_1 = __importDefault(require("moment"));
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var urlToUploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');
var allowedTypes = ['png', 'jpg', 'jpeg'];
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(urlToUploadsFolder)) {
            fs.mkdirSync(urlToUploadsFolder, { recursive: true });
        }
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var date = moment_1.default().format('DDMMYYYY-HHmmss_SSS');
        cb(null, date + "-" + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    var type = file.mimetype.split('/')[1];
    if (allowedTypes.includes(type)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var limits = {
    fileSize: 5242880
};
exports.default = multer_1.default({ storage: storage, fileFilter: fileFilter, limits: limits });
