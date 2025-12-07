"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHtml = exports.generateColumn = exports.generateStyles = void 0;
const path_1 = __importDefault(require("path"));
const extension_1 = require("./extension");
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = require("fs");
function generateStyles() {
    return /* html */ `
    <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #1e1e1e; color: #d4d4d4; padding: 20px; }
    h1 { color: var(--vscode-foreground) }
    pre { background: #252526; padding: 15px; border-radius: 6px; overflow-x: auto; }
    code { font-family: 'Fira Code', monospace; }
    a { color: #4fc1ff; }
    .kb-group-container {
        background-color: var(--vscode-panel-background);
        flex: 1 1 100%;
        padding-left: 10px;
        padding-right:  10px;
    }
    .kbs-container {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }
    .kb-title {
        padding: 8px;
        width: fit-content;
    }


    /* On wider screens, items take 48% width (~2 columns with gap) */
    @media (min-width: 600px) {
        .kb-group-container {
            flex: 1 1 48%;
        }
    }
    /* On large screens, items take 30% width (~3 columns) */
    @media (min-width: 900px) {
        .kb-group-container {
            flex: 1 1 30%;
        }
    }
    </style>`;
}
exports.generateStyles = generateStyles;
const vibrantColors = [
    "#FF595E",
    "#00B4D8",
    "#F72585",
    "#FF9F1C",
    "#7209B7",
    "#FF6F61",
    "#3A0CA3",
    "#3FBF7F",
    "#FFBA08",
    "#0096C7",
    "#4361EE",
    "#E63946",
    "#80ED99",
    "#4CC9F0",
    "#FF5D8F",
    "#06D6A0",
    "#5F0F40",
    "#F1FA3C",
    "#9D4EDD",
    "#FFBE0B"
];
function generateColumn(keybindings) {
    return /* html */ `
    <div class="kbs-container">
    ${Array.from(keybindings.entries()).filter(([k, v]) => v.length !== 0).map(([key, value], index) => ( /* html */`
        <div class="kb-group-container">
            <h4 class="kb-title" style="background-color: ${vibrantColors[index % vibrantColors.length]}88;">${key === extension_1.UNGROUPED_KEY ? "Misc" : key}</h4>
            ${value.map(({ desc, key }) => /* html */ `
            <p>${desc === undefined ? "No description provided" : desc}</p>
            <p>${key}</p>
            `).join("")}
        </div>
        `)).join("")}
    </div>
    `;
}
exports.generateColumn = generateColumn;
function generateHtml(keybindings) {
    // 1️⃣ Prepare data for template
    const groups = Array.from(keybindings.entries())
        .filter(([k, v]) => v.length !== 0)
        .map(([key, value], index) => ({
        title: key === extension_1.UNGROUPED_KEY ? "Misc" : key,
        color: vibrantColors[index % vibrantColors.length],
        items: value.map(({ desc, key }) => ({
            desc: desc ?? "No description provided",
            key
        }))
    }));
    // 2️⃣ Load the Handlebars file
    const templatePath = path_1.default.join(__dirname, "keybindings.hbs");
    const templateContent = (0, fs_1.readFileSync)(templatePath, "utf-8");
    // 3️⃣ Compile template
    const template = handlebars_1.default.compile(templateContent);
    // 4️⃣ Render HTML
    return template({ groups });
}
exports.generateHtml = generateHtml;
//# sourceMappingURL=generateHtml.js.map