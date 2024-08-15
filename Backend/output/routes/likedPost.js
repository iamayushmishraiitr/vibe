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
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id)
        return res.status(404).send("Please send valid data");
    const user = yield prisma.user.findUnique({
        where: { id: parseInt(id.toString()) }
    });
    if (!user)
        return res.status(404).send("No user exists ");
    const arr = (user.liked);
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
        const res = yield prisma.post.findUnique({
            where: { id: parseInt(arr[i]) }
        });
        newarr.push(res);
    }
    res.status(200).send(newarr);
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.body.id);
    try {
        const response = yield prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: req.body.values.username,
                bio: req.body.values.bio,
                userimage: req.body.imgUrl[0],
            }
        });
        const responsepost = yield prisma.post.findMany({
            where: {
                userId: id
            }
        });
        if (responsepost.length > 0) {
            const updatedPosts = responsepost.map(post => (Object.assign(Object.assign({}, post), { userimage: req.body.imgUrl[0], username: req.body.username })));
            //console.log("Updated Posyt    " , updatedPosts)
            yield Promise.all(updatedPosts.map(updatedPost => prisma.post.update({
                where: { id: updatedPost.id },
                data: {
                    userimage: updatedPost.userimage,
                    username: updatedPost.username
                }
            })));
        }
        return res.status(200).send("Updates successfully ");
    }
    catch (error) {
        return res.status(404);
    }
}));
exports.default = router;
