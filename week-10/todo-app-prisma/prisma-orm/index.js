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
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const SECRET_KEY = 'my_secret_key';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
const UserSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(4).max(8)
});
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = UserSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(411).json({ msg: 'Invalid' });
    }
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { email: req.body.email }
        });
        if (existingUser) {
            res.status(411).json({ msg: 'Email already exists' });
        }
        const newUser = yield prisma.user.create({
            data: {
                email: req.body.email,
                password: req.body.password
            }
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, SECRET_KEY);
        res.json({ token });
        console.log("Successfully added user");
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
const AuthenticatedUserSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(4).max(8)
});
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = AuthenticatedUserSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(411).json({ msg: 'Invalid' });
    }
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({ id: existingUser.id }, SECRET_KEY);
            res.json({ msg: "loggen in" });
        }
        else {
            res.status(401).json({ msg: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
