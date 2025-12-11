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
exports.deactivate = exports.activate = exports.UNGROUPED_KEY = void 0;
// TODO: Only import the functions I need
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const parse_1 = require("./parse");
const generateHtml_1 = require("./generateHtml");
const DEFAULT_THEME = generateHtml_1.Theme.Random;
function getActiveKeybindingsPath() {
    const keybindingsFileName = "keybindings.json";
    const platform = process.platform;
    const homedir = os.homedir();
    const appName = (vscode.env.appName || "").toLowerCase();
    let productFolder = "Code";
    if (appName.includes("insiders"))
        productFolder = "Code - Insiders";
    else if (appName.includes("vscodium"))
        productFolder = "VSCodium";
    if (platform === "darwin")
        return path.join(homedir, "Library", "Application Support", productFolder, "User", keybindingsFileName);
    if (platform === "win32")
        return path.join(process.env.APPDATA || path.join(homedir, "AppData", "Roaming"), productFolder, "User", keybindingsFileName);
    const vscodeRoot = path.join(homedir, ".config", productFolder, "User", keybindingsFileName);
    const defaultKB = vscodeRoot;
    return defaultKB;
}
const parseLineComment = (line) => line.indexOf("//") === -1
    ? ""
    : line.slice(line.indexOf("//") + 2).trimStart();
exports.UNGROUPED_KEY = "_ungrouped_";
function groupKeybinds(keybindsEntries) {
    // A group is a section of keybinds with a shared title
    const map = new Map();
    map.set(exports.UNGROUPED_KEY, []);
    for (const entry of keybindsEntries) {
        if (entry.type === "comment") {
            const groupName = parseLineComment(entry.value);
            if (!map.has(groupName)) {
                map.set(groupName, []);
            }
        }
        if (entry.type === "object") {
            const keys = Array.from(map.keys());
            const lastKey = keys.length > 0 ? keys[keys.length - 1] : exports.UNGROUPED_KEY;
            map.get(lastKey).push({ desc: entry.value.desc, key: entry.value.key });
        }
    }
    return map;
}
function activate(context) {
    const disposable = vscode.commands.registerCommand("keymapViewer.showKeymaps", async (args) => {
        const appSettingsPath = args?.keymapsConfigPath || getActiveKeybindingsPath();
        const upperTheme = args?.theme?.toUpperCase();
        if (!Object.values(generateHtml_1.Theme).includes(upperTheme)) {
            vscode.window.showErrorMessage(`Invalid theme (${args?.theme})... choosing random color scheme`);
        }
        const theme = generateHtml_1.argToTheme[args.theme ? args.theme?.toUpperCase() : DEFAULT_THEME];
        if (fs.existsSync(appSettingsPath)) {
            const content = fs.readFileSync(appSettingsPath, "utf8");
            const panel = vscode.window.createWebviewPanel("keybindingsMarkdownView", "Keybindings Cheatsheet", vscode.ViewColumn.One, { enableScripts: false });
            panel.webview.html = getMarkdownHtml(content, theme);
        }
        else {
            vscode.window.showErrorMessage(`Could not find keybindings.json: (${appSettingsPath})`);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function getMarkdownHtml(content, theme) {
    // Ignore comments before or after the array of keybindings.
    // These will mess with the parser
    const cleanObj = content.slice(content.indexOf("["), content.lastIndexOf("]") + 1);
    const parsedKeybindings = (0, parse_1.parseKeybindings)(cleanObj);
    const groupedKeybindings = groupKeybinds(parsedKeybindings);
    return (0, generateHtml_1.generateHtml)(groupedKeybindings, theme);
}
//# sourceMappingURL=extension.js.map