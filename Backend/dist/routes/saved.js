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
    const { userid, id } = req.body;
    if (!userid || !id)
        return res.status(404).send("Please send Valid data");
    try {
        const postinfo = yield prisma.post.findUnique({
            where: {
                id: id,
            },
        });
        // console.log(postinfo);
        if (!postinfo)
            return res.status(404);
        const newarr = [...postinfo.saved, userid];
        yield prisma.post.update({
            where: {
                id: id,
            },
            data: {
                saved: {
                    set: newarr,
                },
            },
        });
        const userinfo = yield prisma.user.findUnique({
            where: {
                id: parseInt(userid),
            },
        });
        postinfo.saved = newarr;
        if (!userinfo)
            return res.status(404);
        const newarr2 = [...userinfo.saved, JSON.stringify(id)];
        //console.log(newarr2 ,"here is newarr2 ")
        const x = yield prisma.user.update({
            where: {
                id: parseInt(userid),
            },
            data: {
                saved: { set: newarr2
                }
            },
        });
        //   console.log("saved   " ,x )
        return res.status(200).send("saved ");
    }
    catch (error) {
        console.log(error);
    }
}));
/*=====================================================================Delete Request ============================================*/
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, id } = req.body;
    if (!userid || !id)
        res.status(404).send("Please send complete Credentials");
    try {
        const postinfo = yield prisma.post.findUnique({
            where: {
                id: id,
            },
        });
        if (!postinfo)
            return res.status(404);
        const newar = postinfo.saved.filter((item) => item !== userid);
        yield prisma.post.update({
            where: {
                id: id,
            },
            data: {
                saved: {
                    set: newar,
                },
            },
        });
        const userinfo = yield prisma.user.findUnique({
            where: {
                id: parseInt(userid),
            },
        });
        if (!userinfo)
            return res.status(404);
        const newar2 = userinfo.saved.filter((item) => item !== JSON.stringify(id));
        yield prisma.user.update({
            where: {
                id: parseInt(userid),
            },
            data: {
                saved: {
                    set: newar2,
                },
            },
        });
        return res.status(200).send("saved ");
    }
    catch (error) {
        console.log(error);
    }
}));
/*============================================================================GET======================================*/
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id)
        return res.status(404).send("Please send valid data");
    const user = yield prisma.user.findUnique({
        where: { id: parseInt(id.toString()) }
    });
    if (!user)
        return res.status(404).send("No user exists ");
    const arr = (user.saved);
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
        const res = yield prisma.post.findUnique({
            where: { id: parseInt(arr[i]) }
        });
        newarr.push(res);
    }
    res.status(200).send(newarr);
}));
exports.default = router;
