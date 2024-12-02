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
// index.ts
const express_1 = __importDefault(require("express"));
const Db_1 = require("./Db"); // Import User model from db.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const JWT_SECRET = "Depx";
const app = (0, express_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
// Define signup request schema using zod
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(6).max(20),
    password: zod_1.z.string().min(12).max(29),
    email: zod_1.z.string().email(),
});
// Signup route
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request body using zod
        const parsedData = signupSchema.parse(req.body);
        const { username, password, email } = parsedData;
        const securepass = yield bcrypt_1.default.hash(password, 6);
        // Create a new user in the database
        yield Db_1.UserModel.create({
            username,
            password: securepass,
            email,
        });
        res.json({ message: "You are signed up" });
    }
    catch (e) {
        console.error(e);
        res.status(404).json({ message: "Signup failed" });
    }
}));
// Signin route
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Find the user by username
        const user = yield Db_1.UserModel.findOne({ username });
        if (!user || !user.password) {
            return res.status(404).json({ message: "Invalid username or password" });
        }
        // Compare the provided password with the stored password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Signin failed" });
    }
}));
// Start server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
