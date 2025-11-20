import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os"
import MarkdownIt from "markdown-it";


/**
 * Returns the User settings root folder (e.g. ~/Library/Application Support/Code/User
 * on macOS, ~/.config/Code/User on Linux, %APPDATA%/Code/User on Windows).
 *
 * This constructs the path from the OS + product name (VS Code / Insiders / VSCodium).
 * If VS Code was started with a custom --user-data-dir it cannot be discovered reliably;
 * in that case we fall back to vscode.env.appSettingsPath.
 */
function getUserSettingsRoot(): string {
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

/**
 * Returns the active profile's keybindings.json path.
 * - If there's a profiles/profile.json with an active profile id, uses that.
 * - If not present, falls back to <User>/keybindings.json.
 * - If constructed path doesn't exist, falls back to vscode.env.appSettingsPath.
 */
export function getActiveKeybindingsPath(): string {
  try {
    // 1) Prefer constructed path (covers normal mac/linux/win locations)
    const constructedRoot = getUserSettingsRoot();
    const profileCfg = path.join(constructedRoot, "profile.json");
    if (fs.existsSync(profileCfg)) {
      try {
        const j = JSON.parse(fs.readFileSync(profileCfg, "utf8"));
        const profileId = j && j.profile;
        if (profileId && typeof profileId === "string") {
          const candidate = path.join(constructedRoot, "profiles", profileId, "keybindings.json");
          if (fs.existsSync(candidate)) return candidate;
        }
      } catch (e) {
        // ignore parse errors and continue to default fallback
      }
    }

    // Default (no profile) location in constructed root
    const defaultKB = path.join(constructedRoot, "keybindings.json");
    if (fs.existsSync(defaultKB)) return defaultKB;

    // 2) Fallback: use vscode.env.appSettingsPath (may be for remote environment)
    try {
      const envRoot = vscode.env.appRoot as string; // e.g. '/home/user/.config/Code/User' or remote path
      if (envRoot) {
        // check profile there
        const envProfileCfg = path.join(envRoot, "profile.json");
        if (fs.existsSync(envProfileCfg)) {
          const j = JSON.parse(fs.readFileSync(envProfileCfg, "utf8"));
          const profileId = j && j.profile;
          if (profileId && typeof profileId === "string") {
            const candidate = path.join(envRoot, "profiles", profileId, "keybindings.json");
            if (fs.existsSync(candidate)) return candidate;
          }
        }
        const envDefaultKB = path.join(envRoot, "keybindings.json");
        if (fs.existsSync(envDefaultKB)) return envDefaultKB;
      }
    } catch (e) {
      // ignore
    }

    // 3) If nothing found, return the *constructed default path* even if missing
    // so the caller knows where we'd expect it to be.
    return defaultKB;
  } catch (err) {
    console.error("getActiveKeybindingsPath error:", err);
    return "";
  }
}


export function activate(context: vscode.ExtensionContext) {

  const disposable = vscode.commands.registerCommand(
    "keymapViewer.showKeymaps",
    async () => {
      // Determine the keybindings path for the current profile
      const keybindingsUri = await vscode.workspace.getConfiguration().get<string>(
        "keyboard.dispatch"
      );

      // VS Code stores keybindings per-profile in the global storage path
      const appSettingsPath = getActiveKeybindingsPath(); // root for user settings

      // The keybindings file lives in `${appSettingsPath}/User/keybindings.json`
      const keybindingsPath = path.join(appSettingsPath);

      if (!fs.existsSync(keybindingsPath)) {
        vscode.window.showErrorMessage(
          "Could not find keybindings.json for the current profile."
        );
        return;
      }

      const content = fs.readFileSync(keybindingsPath, "utf8");

      const panel = vscode.window.createWebviewPanel(
        "keybindingsMarkdownView",
        "Keybindings (Markdown)",
        vscode.ViewColumn.One,
        {
          enableScripts: false
        }
      );

      // Convert JSON keybindings to a markdown code block
      const markdown = `# Your Keybindings (Profile Aware)\n\n\n\`\`\`json\n${content}\n\`\`\``;

      // Use built‑in markdown renderer
      panel.webview.html = getMarkdownHtml(markdown);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() { }

function getMarkdownHtml(content: string): string {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  const markdownContent = `# Your VS Code Keybindings\n\nHere are your current keybindings in JSON format:\n\n\`\`\`json\n${content}\n\`\`\``;
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