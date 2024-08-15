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
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id1, id2 } = req.body;
    if (!id1 || !id2) {
        return res.status(400).send("Send complete data");
    }
    try {
        const user1 = yield prisma.user.findUnique({
            where: { id: parseInt(id1) },
        });
        if (!user1) {
            return res.status(404).send("User1 does not exist");
        }
        const updatedFollowing = user1.following.filter((item) => item !== id2.toString());
        yield prisma.user.update({
            where: { id: parseInt(id1) },
            data: {
                following: {
                    set: updatedFollowing,
                },
            },
        });
        const user2 = yield prisma.user.findUnique({
            where: { id: parseInt(id2) },
        });
        if (!user2) {
            return res.status(404).send("User2 does not exist");
        }
        const updatedFollowers = user2.followers.filter((item) => item !== id1.toString());
        yield prisma.user.update({
            where: { id: parseInt(id2) },
            data: {
                followers: {
                    set: updatedFollowers,
                },
            },
        });
        return res.status(200).send("Data updated");
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
}));
/*==========================================================================GET=================================*/
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id)
        return res.status(404).send("Please send The id ");
    const data = yield prisma.user.findUnique({
        where: {
            id: parseInt(id.toString())
        }
    });
    if (!data)
        return res.status(404).send("You valid User");
    const arr = data.following;
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
        const curid = arr[i];
        const res1 = yield prisma.user.findUnique({
            where: {
                id: parseInt(curid.toString())
            }
        });
        //console.log("Here is New Arr   ",res1)
        if (!res1)
            return res.status(404);
        const newdata = { username: res1.username, userimage: res1.userimage, id: res1.id };
        newarr.push(JSON.stringify(newdata));
    }
    return res.status(200).send(newarr);
}));
exports.default = router;
