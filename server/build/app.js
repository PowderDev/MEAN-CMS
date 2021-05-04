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
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var passport_1 = __importDefault(require("passport"));
var passport_2 = __importDefault(require("./middleware/passport"));
var path = __importStar(require("path"));
var app = express_1.default();
//Things
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(passport_1.default.initialize());
passport_2.default(passport_1.default);
app.use('/uploads', express_1.default.static('uploads'));
//Routes
var auth_1 = __importDefault(require("./routes/auth"));
var analytics_1 = __importDefault(require("./routes/analytics"));
var order_1 = __importDefault(require("./routes/order"));
var category_1 = __importDefault(require("./routes/category"));
var position_1 = __importDefault(require("./routes/position"));
app.use('/api/auth', auth_1.default);
app.use('/api/analytics', analytics_1.default);
app.use('/api/order', order_1.default);
app.use('/api/category', category_1.default);
app.use('/api/position', position_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('../../client/dist/app'));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'app', 'index.html'));
    });
}
exports.default = app;
