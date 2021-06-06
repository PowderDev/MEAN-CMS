"use strict";
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
exports.analytics = exports.overview = void 0;
var moment_1 = __importDefault(require("moment"));
var Order_1 = __importDefault(require("../models/Order"));
var ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
var overview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allOrders, ordersMap, yesterday, yesterdayOrders, yesterdayOrdersNumber, totalOrdersNumber, daysNumber, ordersPerDay, ordersPercent, totalRevenue, revenuePerDay, yesterdayRevenue, revenuePercent, comparedRevenue, comparedNumber, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order_1.default.find().sort({ date: 1 })];
            case 1:
                allOrders = _a.sent();
                ordersMap = getOrdersMap(allOrders);
                yesterday = moment_1.default().add(-1, 'd').format('DD.MM.YYYY');
                yesterdayOrders = ordersMap[yesterday] || [];
                yesterdayOrdersNumber = yesterdayOrders.length;
                totalOrdersNumber = allOrders.length;
                daysNumber = Object.keys(ordersMap).length;
                ordersPerDay = Math.round(totalOrdersNumber / daysNumber);
                ordersPercent = Math.round(((yesterdayOrdersNumber / ordersPerDay) - 1) * 100);
                totalRevenue = calcMoney(allOrders);
                revenuePerDay = totalRevenue / daysNumber;
                yesterdayRevenue = calcMoney(yesterdayOrders);
                revenuePercent = Math.round(((yesterdayRevenue / revenuePerDay) - 1) * 100);
                comparedRevenue = Math.round(yesterdayRevenue - revenuePerDay);
                comparedNumber = Math.round(yesterdayOrders - ordersPerDay);
                res.status(200).json({
                    revenue: {
                        percent: Math.abs(revenuePercent),
                        compare: Math.abs(comparedRevenue),
                        yesterday: yesterdayRevenue,
                        isHigher: revenuePercent > 0
                    },
                    orders: {
                        percent: Math.abs(ordersPercent),
                        compare: Math.abs(comparedNumber),
                        yesterday: yesterdayOrdersNumber,
                        isHigher: ordersPercent > 0
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                ErrorHandler_1.default(err_1, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.overview = overview;
var analytics = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allOrders, ordersMap_1, days, averageSum, chart, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order_1.default.find().sort({ date: 1 })];
            case 1:
                allOrders = _a.sent();
                ordersMap_1 = getOrdersMap(allOrders);
                days = Object.keys(ordersMap_1).length;
                averageSum = Math.round(calcMoney(allOrders) / days);
                chart = Object.keys(ordersMap_1).map(function (label) {
                    // label === 03.05.2021
                    var revenue = calcMoney(ordersMap_1[label]);
                    var order = ordersMap_1[label].length;
                    return { label: label, order: order, revenue: revenue };
                });
                res.status(200).json({ averageSum: averageSum, chart: chart });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                ErrorHandler_1.default(err_2, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.analytics = analytics;
function getOrdersMap(orders) {
    var daysOrders = {};
    orders.forEach(function (order) {
        var date = moment_1.default(order.date).format('DD.MM.YYYY');
        if (date === moment_1.default().format('DD.MM.YYYY'))
            return;
        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }
        daysOrders[date].push(order);
    });
    return daysOrders;
}
function calcMoney(orders) {
    return orders.reduce(function (acc, order) {
        var orderPrice = caclOrderPrice(order);
        acc += orderPrice;
        return acc;
    }, 0);
}
function caclOrderPrice(order) {
    return order.list.reduce(function (acc, item) {
        acc += item.cost;
        return acc;
    }, 0);
}
