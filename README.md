# VS Code Keybindings cheatsheet

- [Setup](#setup)
- [Extension Options](#extension-options)

## Setup

Take an existing keybindings file

```jsonc
[
  {
    "key": "ctrl-h",
    "command": "workbench.action.navigateLeft",
  },
  {
    "key": "space e",
    "command": "runCommands",
    "args": {
      "commands": [
        "workbench.action.toggleSidebarVisibility",
        "workbench.files.action.focusFilesExplorer",
      ],
    },
    "when": "vim.mode == 'Normal' && (editorTextFocus || !inputFocus) && !sideBarFocus",
  },
  {
    "key": "r",
    "command": "renameFile",
    "when": "filesExplorerFocus && foldersViewVisible && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus",
  },
  // more keybindings...
]
```

Add some comments above keybinds to create a section header.
All keybindings below this comment are included in the section.
Then add a `"desc"` field to every keybind to describe it.

```jsonc
[
  // Navigation
  {
    "key": "ctrl-h",
    "command": "workbench.action.navigateLeft",
    "desc": "Move focus left",
  },

  // Sidebar
  {
    "key": "space e",
    "command": "runCommands",
    "args": {
      "commands": [
        "workbench.action.toggleSidebarVisibility",
        "workbench.files.action.focusFilesExplorer",
      ],
    },
    "when": "vim.mode == 'Normal' && (editorTextFocus || !inputFocus) && !sideBarFocus",
    "desc": "Open file explorer",
  },

  // File Explorer
  {
    "key": "r",
    "command": "renameFile",
    "when": "filesExplorerFocus && foldersViewVisible && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus",
    "desc": "Rename file",
  },

  // more keybindings...
]
```

Add another keybinding for opening the cheatsheet itself

```jsonc
[
  // more keybindings...

  // Cheatsheet
  {
    "key": "space c s",
    "command": "keybindingsCheatsheet.showCheatsheet",
    "args": {
      "keymapsConfigPath": "/path/to/keybindings.json",
      "theme": "catppuccin", // Theme options can be found below
    },
    "when": "vim.mode == 'Normal' && (editorTextFocus || !inputFocus)",
    "desc": "Open cheatsheet",
  },
]
```

## Extension Options

The cheatsheet ships with several options for the table headers.
The options are as follows:

Theme options (JSON strings for `args.theme`):

- `"random"`
- `"orange"`
- `"yellow"`
- `"green"`
- `"blue"`
- `"violet"`
- `"gray"`
- `"catppuccin"`
