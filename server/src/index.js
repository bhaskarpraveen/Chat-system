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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = __importDefault(require("socket.io"));
require('dotenv').config();
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const chatRooms_1 = __importDefault(require("./models/chatRooms"));
const port = process.env.PORT;
const db = process.env.DATABASE_URL || 'mongodb://localhost:27017/chatsystem';
mongoose_1.default.connect(db, { useFindAndModify: false }, () => {
    console.log('Connected to Db!!');
});
app.use(cors_1.default());
app.get('/', (req, res) => {
    res.send('hello');
});
app.get('/room/:name', function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = request.params;
        console.log(request.params);
        const messages = yield chatRooms_1.default.findOne({ name: name });
        return response.status(200).json(messages);
    });
});
const server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
const Io = socket_io_1.default(server);
Io.sockets.on('connection', (socket) => {
    socket.on('join', (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data);
        socket.join(data.room);
        const FindRoom = yield chatRooms_1.default.countDocuments({ name: data.room });
        if (!FindRoom) {
            let newRoom = new chatRooms_1.default({
                name: data.room
            });
            newRoom.save().catch(err => console.log(err.message));
        }
    }));
    socket.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        Io.in(data.room).emit('new message', { user: data.user, message: data.message });
        yield chatRooms_1.default.findOneAndUpdate({ name: data.room }, { $push: { messages: { user: data.user, message: data.message } } });
    }));
    socket.on('typing', (data) => {
        console.log('typing');
        // Broadcasting to all the users except the one typing 
        socket.broadcast.in(data.room).emit('typing', { data: data, isTyping: true });
    });
});
