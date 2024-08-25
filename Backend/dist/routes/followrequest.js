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
// Helper function to check if user data is complete
const isUserDataComplete = (user) => !!user.id && !!user.username && !!user.id1;
// POST: Follow request
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: req.body.id,
        username: req.body.username,
        image: req.body.image,
        id1: req.body.id1,
    };
    if (!isUserDataComplete(user)) {
        return res.status(400).send("Please send complete data");
    }
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: parseInt(user.id1) },
            data: {
                request: {
                    push: user.id.toString(),
                },
            },
        });
        const updatedUser2 = yield prisma.user.update({
            where: { id: user.id },
            data: {
                requestrecieve: {
                    push: user.id1,
                },
            },
        });
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}));
// DELETE: Cancel follow request
route.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: req.body.id,
        username: req.body.username,
        image: req.body.image,
        id1: req.body.id1,
    };
    if (!isUserDataComplete(user)) {
        return res.status(400).send("Please send complete data");
    }
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { id: parseInt(user.id1) },
        });
        if (!existingUser) {
            return res.status(404).send("User not found");
        }
        const updatedUser = yield prisma.user.update({
            where: { id: parseInt(user.id1) },
            data: {
                request: {
                    set: existingUser.request.filter((item) => item !== user.id.toString()),
                },
            },
        });
        const existingUser2 = yield prisma.user.findUnique({
            where: { id: user.id },
        });
        if (!existingUser2) {
            return res.status(404).send("User not found");
        }
        const updatedUser2 = yield prisma.user.update({
            where: { id: user.id },
            data: {
                requestrecieve: {
                    set: existingUser2.requestrecieve.filter((item) => item !== user.id1),
                },
            },
        });
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}));
// GET: Retrieve follow requests
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id)
        return res.status(400).send("Please send the ID");
    try {
        const user = yield prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user)
            return res.status(404).send("Invalid user");
        const requests = yield Promise.all(user.requestrecieve.map((reqId) => __awaiter(void 0, void 0, void 0, function* () {
            const requestedUser = yield prisma.user.findUnique({
                where: { id: parseInt(reqId) },
            });
            if (!requestedUser)
                throw new Error("User not found");
            return JSON.stringify(requestedUser);
        })));
        return res.status(200).send(requests);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}));
exports.default = route;
