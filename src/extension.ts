import * as vscode from "vscode";
import * as fs from "fs";
import { parseKeybindings } from "./parse";
import { generateHtml, Theme } from "./generateHtml";

export type GroupedKeybindings = Map<string, { desc: string; key: string }[]>;

export const UNGROUPED_KEY = "_ungrouped_";

const parseLineComment = (line: string) =>
  line.indexOf("//") === -1
    ? ""
    : line.slice(line.indexOf("//") + 2).trimStart();

const isTheme = (val: unknown): val is Theme =>
  Object.values(Theme).includes(val as Theme);

async function askForKbPath(initial?: string): Promise<string | undefined> {
  if (initial) return initial;

  return vscode.window.showInputBox({
    prompt: "Path to keybindings.json",
    placeHolder: "/abs/path/to/keybindings.json",
    validateInput: (input) => {
      if (!input.trim()) return "Path cannot be empty";
      if (!input.startsWith("/")) return "Paht must be absolute";
      return null;
    },
  });
}

async function askForTheme(initial?: string): Promise<Theme | undefined> {
  const normalized = initial?.toUpperCase();
  if (normalized && isTheme(normalized)) return normalized;

  const items = Object.values(Theme).map((theme) => ({
    label: theme.charAt(0).toUpperCase() + theme.slice(1).toLowerCase(),
    value: theme,
  }));

  const picked = await vscode.window.showQuickPick(items, {
    placeHolder: "Select a theme",
  });

  return picked?.value;
}

function groupKeybinds(keybindsEntries: ReturnType<typeof parseKeybindings>) {
  // A group is a section of keybinds with a shared title
  const map: GroupedKeybindings = new Map();
  map.set(UNGROUPED_KEY, []);

  for (const entry of keybindsEntries) {
    if (entry.type === "comment") {
      const groupName = parseLineComment(entry.value);
      if (!map.has(groupName)) {
        map.set(groupName, []);
      }
    }
    if (entry.type === "object") {
      const keys = Array.from(map.keys());
      const lastKey = keys.length > 0 ? keys[keys.length - 1] : UNGROUPED_KEY;

      map.get(lastKey)!.push({ desc: entry.value.desc, key: entry.value.key });
    }
  }
  return map;
}

type ExtensionArgs = {
  keymapsConfigPath?: string;
  theme?: Theme;
};

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "keybindingsCheatsheet.showCheatsheet",
    async (args: ExtensionArgs) => {
      const path = await askForKbPath(args?.keymapsConfigPath);
      if (!path) return;

      const theme = await askForTheme(args?.theme);
      if (!theme) return;

      try {
        const content = fs.readFileSync(path, "utf8");
        const panel = vscode.window.createWebviewPanel(
          "keybindingsMarkdownView",
          "Keybindings Cheatsheet",
          vscode.ViewColumn.One,
          { enableScripts: false },
        );

        // Ignore comments before or after the array of keybindings.
        // These will mess with the parser
        const extractedKeybindingsArray = content.slice(
          content.indexOf("["),
          content.lastIndexOf("]") + 1,
        );
        const keybindingsEntries = parseKeybindings(extractedKeybindingsArray);
        const groupedKeybindings = groupKeybinds(keybindingsEntries);
        panel.webview.html = generateHtml(groupedKeybindings, theme);
      } catch (err) {
        handleFileError(err, path);
      }
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

function handleFileError(error: unknown, path: string) {
  if (error instanceof Error && "code" in error) {
    switch ((error as NodeJS.ErrnoException).code) {
      case "ENOENT":
        vscode.window.showErrorMessage(`Keybindings file not found:\n${path}`);
        return;

      case "EACCES":
        vscode.window.showErrorMessage(`Permission denied reading:\n${path}`);
        return;
    }
  }

  vscode.window.showErrorMessage(`Failed to read keybindings.json`);

  console.error(error);
}
