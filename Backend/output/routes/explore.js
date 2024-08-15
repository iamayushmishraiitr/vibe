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
const route = express_1.default.Router();
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id1 = req.body.id1, id2 = req.body.id2, data = req.body.data;
    if (!id1 || !id2 || !data)
        res.status(404).send("please Send complete data");
    const user1 = yield prisma.user.findUnique({
        where: { id: parseInt(id1) },
    });
    if (!user1)
        return res.status(404).send("The User1 Does not exist");
    const arr = user1.requestrecieve.filter((item) => item !== id2.toString());
    const res1 = yield prisma.user.update({
        where: { id: parseInt(id1) },
        data: {
            requestrecieve: {
                set: arr,
            },
            followers: {
                push: id2.toString(),
            },
        },
    });
    if (!res1)
        return res.status(404);
    const user2 = yield prisma.user.findUnique({
        where: { id: id2 },
    });
    if (!user2)
        return res.status(404).send("The User2 Does not exist");
    const arr2 = user2.request.filter((item) => item !== id1.toString());
    const res2 = yield prisma.user.update({
        where: { id: id2 },
        data: {
            request: {
                set: arr2,
            },
            following: {
                push: id1.toString(),
            },
        },
    });
    if (!res2)
        return res.status(404);
    return res.status(200).send("Data Updated");
}));
/*=========================================================DELETE==================================================================*/
route.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id1 = req.body.id1, id2 = req.body.id2;
    if (!id1 || !id2)
        return res.status(404).send("Send Complete data");
    const user1 = yield prisma.user.findUnique({
        where: { id: parseInt(id1) },
    });
    if (!user1)
        return res.status(404).send("The User1 Does not exist");
    const arr = user1.requestrecieve.filter((item) => item != id2.toString());
    const res1 = yield prisma.user.update({
        where: { id: parseInt(id1) },
        data: {
            requestrecieve: {
                set: arr,
            },
        },
    });
    if (!res1)
        return res.status(404);
    const user2 = yield prisma.user.findUnique({
        where: { id: id2 },
    });
    if (!user2)
        return res.status(404).send("The User2 Does not exist");
    const arr2 = user2.request.filter((item) => item != id1.toString());
    const res2 = yield prisma.user.update({
        where: { id: id2 },
        data: {
            request: {
                set: arr2,
            },
        },
    });
    if (!res2)
        return res.status(404);
    return res.status(200).send("Data Updated");
}));
exports.default = route;
