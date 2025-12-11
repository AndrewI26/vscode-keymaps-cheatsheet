import path from "path";
import { GroupedKeybindings, UNGROUPED_KEY } from "./extension";
import Handlebars from "handlebars";
import { readFileSync } from "fs";

export enum Theme {
  Random = "RANDOM",
  Red = "RED",
  Orange = "ORANGE",
  Yellow = "YELLOW",
  Green = "GREEN",
  Blue = "BLUE",
  Violet = "VIOLET",
  Gray = "GRAY",
}

export const argToTheme: Record<string, Theme> = {
  RANDOM: Theme.Random,
  RED: Theme.Red,
  ORANGE: Theme.Orange,
  YELLOW: Theme.Yellow,
  GREEN: Theme.Green,
  BLUE: Theme.Blue,
  VIOLET: Theme.Violet,
  GRAY: Theme.Gray,
};

const randoms = [
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
  "#FFBE0B",
];

const reds = [
  "#4A001F",
  "#8B0010",
  "#FF0033",
  "#5A0A00",
  "#A30021",
  "#7F0037",
  "#D10000",
  "#390009",
  "#E20E5A",
  "#B30000",
];

const oranges = [
  "#552100",
  "#FF4300",
  "#A63F00",
  "#7A1E00",
  "#FF6A00",
  "#4A1E05",
  "#D14F00",
  "#FF3D14",
  "#6B2600",
  "#FF5A22",
];

const yellows = [
  "#4A4000",
  "#FFDD00",
  "#A68A00",
  "#665C00",
  "#FFC400",
  "#3A3200",
  "#E6B800",
  "#C2A300",
  "#7A6C00",
  "#FFB700",
];

const greens = [
  "#003F1A",
  "#00FF66",
  "#006B3C",
  "#00994D",
  "#00CC88",
  "#004221",
  "#00A86B",
  "#002D17",
  "#00E673",
  "#007A29",
];

const blues = [
  "#001F5C",
  "#0077FF",
  "#003366",
  "#0050A1",
  "#1A00FF",
  "#002040",
  "#0090FF",
  "#003C8F",
  "#000D33",
  "#0055FF",
];

const violets = [
  "#3C0066",
  "#B300FF",
  "#4F006B",
  "#7E00D6",
  "#250035",
  "#8A00B3",
  "#5A007F",
  "#C000FF",
  "#34004A",
  "#9C00CC",
];

const grays = [
  "#000000",
  "#0A0A0F",
  "#141414",
  "#1C1C22",
  "#232323",
  "#2B2B34",
  "#111118",
  "#1A1A20",
  "#202027",
  "#33333A",
];

const themeColors: Record<Theme, string[]> = {
  [Theme.Random]: randoms,
  [Theme.Red]: reds,
  [Theme.Orange]: oranges,
  [Theme.Yellow]: yellows,
  [Theme.Green]: greens,
  [Theme.Blue]: blues,
  [Theme.Violet]: violets,
  [Theme.Gray]: grays,
};

export function generateHtml(keybindings: GroupedKeybindings, theme: Theme) {
  const currentColors = themeColors[theme];
  const groups = Array.from(keybindings.entries())
    .filter(([k, v]) => v.length !== 0)
    .map(([key, value], index) => ({
      title: key === UNGROUPED_KEY ? "Misc" : key,
      color: currentColors[index % currentColors.length],
      items: value.map(({ desc, key }) => ({
        desc: desc ?? "No description provided",
        key,
      })),
    }));

  const templatePath = path.join(__dirname, "keybindings.hbs");
  const templateContent = readFileSync(templatePath, "utf-8");
  const template = Handlebars.compile(templateContent);
  return template({ groups });
}
