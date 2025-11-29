import { GroupedKeybindings, UNGROUPED_KEY } from "./extension"

export function generateStyles() {
    return /* html */`
    <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #1e1e1e; color: #d4d4d4; padding: 20px; }
    h1 { color: var(--vscode-foreground) }
    pre { background: #252526; padding: 15px; border-radius: 6px; overflow-x: auto; }
    code { font-family: 'Fira Code', monospace; }
    a { color: #4fc1ff; }
    .title {
        background-color: #3d084ad2;
    }
    .kb-group-container {
        background-color: #3a3a3aff;
        flex: 1 1 100%;
    }
    .kbs-container {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
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
    </style>`
}

function getRandomHexColor() {
    const randomInt = Math.floor(Math.random() * 0x1000000);
    const hex = randomInt.toString(16).padStart(6, '0');
    return `#${hex}`;
}

export function generateColumn(keybindings: GroupedKeybindings) {
    return /* html */`
    <div class="kbs-container">
    ${Array.from(keybindings.entries()).map(([key, value]) => /* html */`
        <div class="kb-group-container">
            <h2 style="background-color: ${getRandomHexColor()}88;">${key === UNGROUPED_KEY ? "Misc" : key}</h2>
            ${value.map(({ desc, key }) => /* html */`
            <p>${desc}</p>
            <p>${key}</p>
            `)}
        </div>
        `).join("")}
    </div>
    `
}