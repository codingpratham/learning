"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateSchema = exports.blogCreateSchema = exports.userSigninSchema = exports.userSignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSignupSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
exports.userSigninSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
exports.blogCreateSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.blogUpdateSchema = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
});
