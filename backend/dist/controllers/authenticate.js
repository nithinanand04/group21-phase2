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
const userService_1 = __importDefault(require("../services/userService"));
function isUserSchema(user) {
    return typeof user.name === 'string' && typeof user.isAdmin === 'boolean';
}
function isUserAuthenticationSchema(user) {
    return typeof user.password === 'string';
}
function authenticate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, secret } = req.body;
        if (!isUserSchema(user) || !isUserAuthenticationSchema(secret)) {
            res.status(400).send('Invalid request');
            return;
        }
        try {
            const isValidUser = yield userService_1.default.verifyUser(user.name, secret.password);
            if (isValidUser) {
                const token = yield userService_1.default.generateToken(user.name);
                res.status(200).send(token);
            }
            else {
                res.status(401).send('Unauthorized');
            }
        }
        catch (_a) {
            res.status(401).send('Unauthorized');
        }
    });
}
exports.default = authenticate;
