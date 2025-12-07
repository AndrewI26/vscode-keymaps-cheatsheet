// TODO: Only import the functions I need
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os"
import MarkdownIt from "markdown-it";
import { parseKeybindings } from "./parse";
import { generateHtml } from "./generateHtml";

function getActiveKeybindingsPath() {
  const keybindingsFileName = "keybindings.json"
  const platform = process.platform;
  const homedir = os.homedir();
  const appName = (vscode.env.appName || "").toLowerCase();

  let productFolder = "Code";
  if (appName.includes("insiders")) productFolder = "Code - Insiders";
  else if (appName.includes("vscodium")) productFolder = "VSCodium";

  if (platform === "darwin") return path.join(homedir, "Library", "Application Support", productFolder, "User", keybindingsFileName);
  if (platform === "win32") return path.join(process.env.APPDATA || path.join(homedir, "AppData", "Roaming"), productFolder, "User", keybindingsFileName);
  const vscodeRoot = path.join(homedir, ".config", productFolder, "User", keybindingsFileName);

  const defaultKB = vscodeRoot;
  if (fs.existsSync(defaultKB)) return defaultKB;
}

const parseLineComment = (line: string) => line.indexOf("//") === -1 ? "" : line.slice(line.indexOf("//") + 2).trimStart()

export type GroupedKeybindings = Map<string, { desc: string, key: string }[]>

export const UNGROUPED_KEY = "_ungrouped_"

function groupKeybinds(keybindsEntries: ReturnType<typeof parseKeybindings>) {
  // A group is a section of keybinds with a shared title
  const map: GroupedKeybindings = new Map();
  map.set(UNGROUPED_KEY, [])

  for (const entry of keybindsEntries) {
    if (entry.type === "comment") {
      const groupName = parseLineComment(entry.value)
      if (!map.has(groupName)) {
        map.set(groupName, [])
      }
    }
    if (entry.type === "object") {
      const keys = Array.from(map.keys())
      const lastKey = keys.length > 0 ? keys[keys.length - 1] : UNGROUPED_KEY

      map.get(lastKey)!.push({ desc: entry.value.desc, key: entry.value.key })
    }
  }
  return map
}


export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "keymapViewer.showKeymaps",
    async (keymapsConfigPath) => {
      const appSettingsPath = keymapsConfigPath || getActiveKeybindingsPath()

      if (fs.existsSync(appSettingsPath)) {
        const content = fs.readFileSync(appSettingsPath, "utf8");
        const panel = vscode.window.createWebviewPanel("keybindingsMarkdownView", "Keybindings Cheatsheet", vscode.ViewColumn.One, { enableScripts: false });

        panel.webview.html = getMarkdownHtml(content);

      } else {
        vscode.window.showErrorMessage(
          `Could not find keybindings.json: (${appSettingsPath})`
        );
      }



    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() { }


function getMarkdownHtml(content: string) {
  const md = new MarkdownIt({
    html: true,
    typographer: true
  });

  // Ignore comments before or after the array of keybindings.
  // These will mess with the parser
  const cleanObj = content.slice(content.indexOf("["), content.lastIndexOf("]") + 1)
  const parsedKeybindings = parseKeybindings(cleanObj)
  const groupedKeybindings = groupKeybinds(parsedKeybindings)

  return generateHtml(groupedKeybindings);
}