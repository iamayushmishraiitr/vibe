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
        const val = req.query.id;
        if (!val)
            return res.status(404);
        const val2 = parseInt(val.toString());
        const arr = yield prisma.user.findUnique({
            where: {
                id: val2
            },
        });
        if (!arr)
            return res.status(404);
        let arr2 = arr === null || arr === void 0 ? void 0 : arr.post;
        if (!arr2)
            return res.status(404);
        let arr3 = [];
        for (let i = 0; i < arr2.length; i++) {
            const resp = yield prisma.post.findUnique({
                where: { id: parseInt(arr2[i]) }
            });
            arr3.push(resp);
        }
        res.status(200).send({ arr3: arr3, val: arr });
    }
    catch (error) {
        res.status(404).send("error occured");
    }
}));
exports.default = router;
