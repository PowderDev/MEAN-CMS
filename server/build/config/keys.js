"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var keys_dev_1 = __importDefault(require("./keys.dev"));
var keys_prod_1 = __importDefault(require("./keys.prod"));
// if (process.env.NODE_ENV === 'production') {
//     export default keysProd
// } else {
//     export default  keysDev
// }
exports.default = process.env.NODE_ENV === 'production' ? keys_prod_1.default : keys_dev_1.default;
