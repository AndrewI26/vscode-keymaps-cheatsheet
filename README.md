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
      "theme": "Catppuccin", // Theme options can be found below
    },
    "when": "vim.mode == 'Normal' && (editorTextFocus || !inputFocus)",
    "desc": "Open cheatsheet",
  },
]
```

## Extension Options

The cheatsheet ships with several options for the table headers.
The options are as follows:

| Theme          | Colors                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"random"`     | <span style="display:inline-block;width:18px;height:18px;background:#FF595E;"></span> <span style="display:inline-block;width:18px;height:18px;background:#00B4D8;"></span> <span style="display:inline-block;width:18px;height:18px;background:#F72585;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FF9F1C;"></span> <span style="display:inline-block;width:18px;height:18px;background:#7209B7;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FF6F61;"></span> <span style="display:inline-block;width:18px;height:18px;background:#3A0CA3;"></span> <span style="display:inline-block;width:18px;height:18px;background:#3FBF7F;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FFBA08;"></span> <span style="display:inline-block;width:18px;height:18px;background:#0096C7;"></span> |
| `"orange"`     | <span style="display:inline-block;width:18px;height:18px;background:#552100;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FF4300;"></span> <span style="display:inline-block;width:18px;height:18px;background:#A63F00;"></span> <span style="display:inline-block;width:18px;height:18px;background:#7A1E00;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FF6A00;"></span> <span style="display:inline-block;width:18px;height:18px;background:#4A1E05;"></span> <span style="display:inline-block;width:18px;height:18px;background:#D14F00;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FF3D14;"></span> <span style="display:inline-block;width:18px;height:18px;background:#6B2600;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FF5A22;"></span> |
| `"yellow"`     | <span style="display:inline-block;width:18px;height:18px;background:#4A4000;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FFDD00;"></span> <span style="display:inline-block;width:18px;height:18px;background:#A68A00;"></span> <span style="display:inline-block;width:18px;height:18px;background:#665C00;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FFC400;"></span> <span style="display:inline-block;width:18px;height:18px;background:#3A3200;"></span> <span style="display:inline-block;width:18px;height:18px;background:#E6B800;"></span> <span style="display:inline-block;width:18px;height:18px;background:#C2A300;"></span> <span style="display:inline-block;width:18px;height:18px;background:#7A6C00;"></span> <span style="display:inline-block;width:18px;height:18px;background:#FFB700;"></span> |
| `"green"`      | <span style="display:inline-block;width:18px;height:18px;background:#003F1A;"></span> <span style="display:inline-block;width:18px;height:18px;background:#00FF66;"></span> <span style="display:inline-block;width:18px;height:18px;background:#006B3C;"></span> <span style="display:inline-block;width:18px;height:18px;background:#00994D;"></span> <span style="display:inline-block;width:18px;height:18px;background:#00CC88;"></span> <span style="display:inline-block;width:18px;height:18px;background:#004221;"></span> <span style="display:inline-block;width:18px;height:18px;background:#00A86B;"></span> <span style="display:inline-block;width:18px;height:18px;background:#002D17;"></span> <span style="display:inline-block;width:18px;height:18px;background:#00E673;"></span> <span style="display:inline-block;width:18px;height:18px;background:#007A29;"></span> |
| `"blue"`       | <span style="display:inline-block;width:18px;height:18px;background:#001F5C;"></span> <span style="display:inline-block;width:18px;height:18px;background:#0077FF;"></span> <span style="display:inline-block;width:18px;height:18px;background:#003366;"></span> <span style="display:inline-block;width:18px;height:18px;background:#0050A1;"></span> <span style="display:inline-block;width:18px;height:18px;background:#1A00FF;"></span> <span style="display:inline-block;width:18px;height:18px;background:#002040;"></span> <span style="display:inline-block;width:18px;height:18px;background:#0090FF;"></span> <span style="display:inline-block;width:18px;height:18px;background:#003C8F;"></span> <span style="display:inline-block;width:18px;height:18px;background:#000D33;"></span> <span style="display:inline-block;width:18px;height:18px;background:#0055FF;"></span> |
| `"violet"`     | <span style="display:inline-block;width:18px;height:18px;background:#3C0066;"></span> <span style="display:inline-block;width:18px;height:18px;background:#B300FF;"></span> <span style="display:inline-block;width:18px;height:18px;background:#4F006B;"></span> <span style="display:inline-block;width:18px;height:18px;background:#7E00D6;"></span> <span style="display:inline-block;width:18px;height:18px;background:#250035;"></span> <span style="display:inline-block;width:18px;height:18px;background:#8A00B3;"></span> <span style="display:inline-block;width:18px;height:18px;background:#5A007F;"></span> <span style="display:inline-block;width:18px;height:18px;background:#C000FF;"></span> <span style="display:inline-block;width:18px;height:18px;background:#34004A;"></span> <span style="display:inline-block;width:18px;height:18px;background:#9C00CC;"></span> |
| `"gray"`       | <span style="display:inline-block;width:18px;height:18px;background:#000000;"></span> <span style="display:inline-block;width:18px;height:18px;background:#0A0A0F;"></span> <span style="display:inline-block;width:18px;height:18px;background:#141414;"></span> <span style="display:inline-block;width:18px;height:18px;background:#1C1C22;"></span> <span style="display:inline-block;width:18px;height:18px;background:#232323;"></span> <span style="display:inline-block;width:18px;height:18px;background:#2B2B34;"></span> <span style="display:inline-block;width:18px;height:18px;background:#111118;"></span> <span style="display:inline-block;width:18px;height:18px;background:#1A1A20;"></span> <span style="display:inline-block;width:18px;height:18px;background:#202027;"></span> <span style="display:inline-block;width:18px;height:18px;background:#33333A;"></span> |
| `"catppuccin"` | <span style="display:inline-block;width:18px;height:18px;background:#d20f39;"></span> <span style="display:inline-block;width:18px;height:18px;background:#179299;"></span> <span style="display:inline-block;width:18px;height:18px;background:#8839ef;"></span> <span style="display:inline-block;width:18px;height:18px;background:#40a02b;"></span> <span style="display:inline-block;width:18px;height:18px;background:#ea76cb;"></span> <span style="display:inline-block;width:18px;height:18px;background:#fe640b;"></span> <span style="display:inline-block;width:18px;height:18px;background:#04a5e5;"></span> <span style="display:inline-block;width:18px;height:18px;background:#e64553;"></span> <span style="display:inline-block;width:18px;height:18px;background:#1e66f5;"></span> <span style="display:inline-block;width:18px;height:18px;background:#df8e1d;"></span> |
