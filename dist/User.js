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
const Db_1 = require("./Db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const JWT_SECRET = "Depx";
const UserRouter = (0, express_1.default)();
mongoose_1.default.connect("mongodb+srv://deepaknegi108r:JHnixgAFz445IawB@cluster0.dbdt7.mongodb.net/userjjkk");
// const signupSchema = z.object({
//     username:z.string().min(6).max(20),
//     password:z.string().min(12).max(29)
// })
UserRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("nldv");
    try {
        const { username, password, email } = req.body;
        const securepass = yield bcrypt_1.default.hash(password, 6);
        console.log("nldv");
        yield Db_1.UserModel.create({
            username: username,
            password: securepass,
            email: email
        });
        console.log("nldv");
        res.json({
            message: "You are signed up"
        });
    }
    catch (e) {
        res.status(404).json({
            message: "signup failed"
        });
    }
}));
UserRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        yield Db_1.UserModel.findOne({
            username,
            password,
            email
        });
        const token = jsonwebtoken_1.default.sign(username, JWT_SECRET);
        res.json({
            token
        });
    }
    catch (e) {
        res.json({
            message: "sign in failed"
        });
    }
}));
UserRouter.listen(3000);
