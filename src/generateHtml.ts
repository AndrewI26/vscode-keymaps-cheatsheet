import path from "path";
import { GroupedKeybindings, UNGROUPED_KEY } from "./extension"
import Handlebars from "handlebars";
import { readFileSync } from "fs"

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

export function generateHtml(keybindings: GroupedKeybindings) {
    const groups = Array.from(keybindings.entries())
        .filter(([k, v]) => v.length !== 0)
        .map(([key, value], index) => ({
            title: key === UNGROUPED_KEY ? "Misc" : key,
            color: vibrantColors[index % vibrantColors.length],
            items: value.map(({ desc, key }) => ({
                desc: desc ?? "No description provided",
                key
            }))
        }));

    const templatePath = path.join(__dirname, "keybindings.hbs");
    const templateContent = readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(templateContent);
    return template({ groups });
}