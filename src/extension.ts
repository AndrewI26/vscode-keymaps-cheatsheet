// TODO: Only import the functions I need
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os"
import MarkdownIt from "markdown-it";
import { parseKeybindings } from "./parse";

function generateVsCodeRoot(): string {
  const platform = process.platform;
  const homedir = os.homedir();
  const appName = (vscode.env.appName || "").toLowerCase();
  let productFolder = "Code";
  if (appName.includes("insiders")) productFolder = "Code - Insiders";
  else if (appName.includes("vscodium")) productFolder = "VSCodium";

  if (platform === "darwin") return path.join(homedir, "Library", "Application Support", productFolder, "User");
  if (platform === "win32") return path.join(process.env.APPDATA || path.join(homedir, "AppData", "Roaming"), productFolder, "User");
  return path.join(homedir, ".config", productFolder, "User");
}

function getActiveKeybindingsPath() {
  try {
    const constructedRoot = generateVsCodeRoot();
    const defaultKB = path.join(constructedRoot, "keybindings.json");
    if (fs.existsSync(defaultKB)) return defaultKB;
  }
  catch (err) {
    console.error("getActiveKeybindingsPath error:", err);
    throw new Error("Unable to access keybindings path");
  }
}


export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "keymapViewer.showKeymaps",
    async (keymapsConfigPath) => {
      let appSettingsPath;
      if (keymapsConfigPath) {
        appSettingsPath = keymapsConfigPath;
      } else { getActiveKeybindingsPath() };



      if (!fs.existsSync(appSettingsPath)) {
        vscode.window.showErrorMessage(
          "Could not find keybindings.json for the current profile."
        );
        return;
      } const content = fs.readFileSync(appSettingsPath, "utf8");
      const panel = vscode.window.createWebviewPanel("keybindingsMarkdownView", "Keybindings Cheatsheet", vscode.ViewColumn.One, { enableScripts: false });

      panel.webview.html = getMarkdownHtml(content);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() { }

function getMarkdownHtml(content: string) {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  const cleanObj = content.slice(content.indexOf("["), content.lastIndexOf("]") + 1)

  const events = parseKeybindings(cleanObj)

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