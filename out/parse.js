"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseKeybindings = void 0;
const jsonc = __importStar(require("jsonc-parser"));
/**
 * Parse the JSONC from a users keybindings.json file.
 * Maintains ordering of comments and objects.
 *
 * Throws if the top-level value is not an array.
 */
function parseKeybindings(text) {
    const entries = [];
    let arrayDepth = 0;
    let objectDepth = 0;
    let currentObjectStart = null;
    jsonc.visit(text, {
        onArrayBegin() {
            arrayDepth++;
        },
        onArrayEnd() {
            arrayDepth--;
        },
        onObjectBegin(offset) {
            objectDepth++;
            if (arrayDepth === 1 && objectDepth === 1) {
                currentObjectStart = offset;
            }
        },
        onObjectEnd(offset, length) {
            if (arrayDepth === 1 &&
                objectDepth === 1 &&
                currentObjectStart !== null) {
                const objStart = currentObjectStart;
                const objEnd = offset + length;
                const raw = text.slice(objStart, objEnd);
                const parsed = jsonc.parse(raw);
                entries.push({ type: "object", value: parsed, offset: objStart });
                currentObjectStart = null;
            }
            objectDepth--;
        },
        onComment(offset, length) {
            if (arrayDepth === 1 && objectDepth === 0) {
                const raw = text.slice(offset, offset + length);
                entries.push({ type: "comment", value: raw, offset });
            }
        },
    });
    const parsedTop = jsonc.parse(text);
    if (!Array.isArray(parsedTop)) {
        throw new Error("Top-level JSONC value must be an array.");
    }
    entries.sort((a, b) => a.offset - b.offset);
    return entries.map(({ offset, ...rest }) => rest);
}
exports.parseKeybindings = parseKeybindings;
//# sourceMappingURL=parse.js.map