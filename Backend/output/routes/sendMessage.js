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
const client_1 = require("@prisma/client");
const socket_1 = require("../socket/socket");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rId, sId, content, type, } = req.body;
    // njfnj
    try {
        const data = yield socket_1.userData.get("online");
        if (!data)
            return;
        const obj = JSON.parse(data);
        const socketId = obj[rId];
        if (socketId) {
            const obj = { content, type, createdAt: "asds", senderId: sId };
            socket_1.pub.publish(`${socketId}`, JSON.stringify(obj));
        }
        // Ensure the listener is only added once
        let conversation = yield prisma.conversation.findFirst({
            where: {
                users: {
                    some: {
                        id: parseInt(rId),
                    },
                },
                AND: {
                    users: {
                        some: {
                            id: parseInt(sId),
                        },
                    },
                },
            },
            include: {
                messages: true,
                users: true,
            },
        });
        if (!conversation) {
            conversation = yield prisma.conversation.create({
                data: {
                    users: {
                        connect: [{ id: parseInt(rId) }, { id: parseInt(sId) }],
                    },
                },
                include: {
                    messages: true,
                    users: true,
                },
            });
        }
        yield prisma.message.create({
            data: {
                content: content,
                type,
                read: false,
                conversation: {
                    connect: { id: conversation.id },
                },
                receiver: {
                    connect: { id: parseInt(rId) },
                },
                sender: {
                    connect: { id: parseInt(sId) },
                },
            },
        });
        res.status(200).send("Message saved successfully");
    }
    catch (err) {
        console.error("Error", err);
        res.status(500).json({
            error: "An error occurred while fetching or creating the conversation",
        });
    }
}));
exports.default = router;
