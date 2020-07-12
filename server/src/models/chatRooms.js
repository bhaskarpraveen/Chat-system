"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let ChatRoomSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    messages: [{
            user: { type: String },
            message: { type: String }
        }]
});
let ChatRoom = mongoose_1.default.model('ChatRoom', ChatRoomSchema);
exports.default = ChatRoom;
