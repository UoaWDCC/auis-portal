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
/*
  Example Route File
*/
const express_1 = require("express");
const zod_1 = require("zod");
const helloRoutes = (0, express_1.Router)();
helloRoutes.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Name = zod_1.z.object({
        name: zod_1.z.string(),
    });
    const result = Name.safeParse(req.params);
    if (!result.success)
        return res.status(400).send(result.error);
    const { name } = result.data;
    return res.status(200).send(`Kia Ora ${name}`);
}));
exports.default = helloRoutes;
