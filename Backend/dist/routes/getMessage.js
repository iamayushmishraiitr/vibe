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
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rId, sId } = req.query;
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
                messages: {
                    select: {
                        senderId: true,
                        content: true,
                        type: true,
                        createdAt: true,
                        receiverId: true
                    },
                },
            },
        });
        const arr = conversation === null || conversation === void 0 ? void 0 : conversation.messages;
        const arr2 = arr === null || arr === void 0 ? void 0 : arr.map((it) => JSON.stringify(it));
        if (!conversation)
            return res.status(200).send([]);
        return res.status(200).send(arr2);
    }
    catch (err) {
        res.status(500).send("Error occured while geting message");
        console.log(err);
    }
}));
exports.default = router;
