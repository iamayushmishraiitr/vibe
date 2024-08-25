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
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
class SocketManager {
    constructor() {
        this.obj = {};
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const map = yield socket_1.userData.get("online");
                this.obj = map ? JSON.parse(map) : {};
            }
            catch (error) {
                console.log("Error occurred while fetching data:", error);
            }
        });
    }
    getUsers() {
        return this.obj;
    }
    setUsers(userId, socketId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.obj[userId] = socketId;
            try {
                yield socket_1.userData.set("online", JSON.stringify(this.obj));
            }
            catch (error) {
                console.log("Error occurred while setting user data:", error);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.obj[userId];
            try {
                yield socket_1.userData.set("online", JSON.stringify(this.obj));
            }
            catch (error) {
                console.log("Error occurred while deleting user data:", error);
            }
        });
    }
}
const manager = new SocketManager();
exports.default = manager;
