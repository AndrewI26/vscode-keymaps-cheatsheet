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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// TODO: Only import the functions I need
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const markdown_it_1 = __importDefault(require("markdown-it"));
const parse_1 = require("./parse");
function generateVsCodeRoot() {
    const platform = process.platform;
    const homedir = os.homedir();
    const appName = (vscode.env.appName || "").toLowerCase();
    let productFolder = "Code";
    if (appName.includes("insiders"))
        productFolder = "Code - Insiders";
    else if (appName.includes("vscodium"))
        productFolder = "VSCodium";
    if (platform === "darwin")
        return path.join(homedir, "Library", "Application Support", productFolder, "User");
    if (platform === "win32")
        return path.join(process.env.APPDATA || path.join(homedir, "AppData", "Roaming"), productFolder, "User");
    return path.join(homedir, ".config", productFolder, "User");
}
function getActiveKeybindingsPath() {
    try {
        const constructedRoot = generateVsCodeRoot();
        const defaultKB = path.join(constructedRoot, "keybindings.json");
        if (fs.existsSync(defaultKB))
            return defaultKB;
    }
    catch (err) {
        console.error("getActiveKeybindingsPath error:", err);
        throw new Error("Unable to access keybindings path");
    }
}
function activate(context) {
    const disposable = vscode.commands.registerCommand("keymapViewer.showKeymaps", async (keymapsConfigPath) => {
        let appSettingsPath;
        if (keymapsConfigPath) {
            appSettingsPath = keymapsConfigPath;
        }
        else {
            getActiveKeybindingsPath();
        }
        ;
        if (!fs.existsSync(appSettingsPath)) {
            vscode.window.showErrorMessage("Could not find keybindings.json for the current profile.");
            return;
        }
        const content = fs.readFileSync(appSettingsPath, "utf8");
        const panel = vscode.window.createWebviewPanel("keybindingsMarkdownView", "Keybindings Cheatsheet", vscode.ViewColumn.One, { enableScripts: false });
        panel.webview.html = getMarkdownHtml(content);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function getMarkdownHtml(content) {
    const md = new markdown_it_1.default({
        html: true,
        linkify: true,
        typographer: true
    });
    const cleanObj = content.slice(content.indexOf("["), content.lastIndexOf("]") + 1);
    const events = (0, parse_1.parseKeybindings)(cleanObj);
    const markdownContent = `# Your Cool VS Code Keybindings\n\nHere are your current keybindings in JSON format: ${generateVsCodeRoot()}\n\n\`\`\`json\n${getActiveKeybindingsPath()}\n\`\`\``;
    const rendered = md.render(markdownContent);
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Keybindings</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #1e1e1e; color: #d4d4d4; padding: 20px; }
h1 { color: #569cd6; }
pre { background: #252526; padding: 15px; border-radius: 6px; overflow-x: auto; }
code { font-family: 'Fira Code', monospace; }
a { color: #4fc1ff; }
</style>
</head>
<body>
${rendered}
</body>
</html>`;
}
//# sourceMappingURL=extension.js.map