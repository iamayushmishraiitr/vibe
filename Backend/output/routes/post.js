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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageUrl, tags, caption, location, userId } = req.body;
        // console.log("user " ,imageUrl)
        const userInt = parseInt(userId);
        const findUser = yield prisma.user.findUnique({
            where: {
                id: userInt
            }
        });
        if (!findUser)
            return res.status(404);
        const response = yield prisma.post.create({
            data: {
                imageUrl: imageUrl[0],
                tags,
                caption,
                location,
                userId: userInt,
                username: findUser.username,
                userimage: findUser.userimage,
                useremail: findUser.email,
            },
        });
        const findUser2 = yield prisma.user.update({
            where: {
                id: userInt
            },
            data: {
                post: {
                    push: JSON.stringify(response.id)
                }
            }
        });
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).send("Internal Server Error");
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.post.findMany();
        if (!data)
            return res.status(404);
        res.status(200).send(data);
    }
    catch (error) {
        return res.status(404).send("Error occure");
    }
}));
exports.default = router;
