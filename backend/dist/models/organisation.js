"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Organisation = new Schema({
    user: { type: String },
    name: { type: String },
    address: { type: String },
    reg_number: { type: Number }
});
exports.default = mongoose_1.default.model("Organisation", Organisation, "organisations");
//# sourceMappingURL=organisation.js.map