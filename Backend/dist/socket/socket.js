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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = exports.pub = exports.sub = exports.server = exports.io = exports.app = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const socketManager_1 = __importDefault(require("./socketManager"));
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
// Configure Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});
exports.io = io;
// Redis configuration
const redisConfig = {
    port: parseInt((_a = process.env.REDIS_PORT) !== null && _a !== void 0 ? _a : "6379", 10),
    host: (_b = process.env.REDIS_URL) !== null && _b !== void 0 ? _b : "localhost",
    password: (_c = process.env.REDIS_PASSWORD) !== null && _c !== void 0 ? _c : undefined,
};
// Initialize Redis client
const pub = new ioredis_1.default(redisConfig);
exports.pub = pub;
const sub = new ioredis_1.default(redisConfig);
exports.sub = sub;
const userData = new ioredis_1.default(redisConfig);
exports.userData = userData;
pub.on("error", (err) => {
    console.error("Redis error:", err);
});
sub.on("error", (err) => {
    console.error("Redis error:", err);
});
// Handle connection
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = socket.handshake.query.userId;
    console.log("The User is connected with sockert id", userId, "  ", socket.id);
    socketManager_1.default.setUsers(userId, socket.id);
    sub.subscribe(`${socket.id}`);
    socket.on('heartbeat', (userId) => {
        const curdate = new Date().toISOString();
        const obj = { userId, curdate };
        userData.set("LastSeen", JSON.stringify(obj));
    });
    let data = yield userData.get("online");
    if (!data)
        data = "";
    const obj = JSON.parse(data);
    io.emit("getOnline", data);
    if (sub.listenerCount("message") === 0) {
        sub.on("message", (channel, messages) => {
            io.to(channel).emit("message", messages);
        });
    }
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("User disconnected:", socket.id);
        sub.unsubscribe(userId);
        socketManager_1.default.deleteUser(userId);
    }));
}));
