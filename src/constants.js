import path from "node:path";
import { fileURLToPath } from "node:url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const CWD = path.resolve(process.cwd());

export const THEME_FOLDER_PATH = path.join(__dirname, "themes");
export const TEMPLATE_FOLDER_PATH = path.join(__dirname, "template");

export const MAIN_DEPENDENCIES = [
  "next@latest",
  "react@latest",
  "react-dom@latest",
];

export const MAIN_DEV_DEPENDENCIES = [
  "@tailwindcss/postcss@latest",
  "@types/node@latest",
  "@types/react@latest",
  "@types/react-dom@latest",
  "babel-plugin-react-compiler@latest",
  "eslint@latest",
  "eslint-config-next@latest",
  "tailwindcss@latest",
  "typescript@latest",
  "tw-animate-css@latest",
];

export const THEME_COLORS = [
  {
    title: "Default",
    value: "default",
    hex: "#171717",
  },
  {
    title: "Blue",
    value: "blue",
    hex: "#1447e6",
  },
  {
    title: "Green",
    value: "green",
    hex: "#5ea500",
  },
  {
    title: "Orange",
    value: "orange",
    hex: "#f54a00",
  },
  {
    title: "Red",
    value: "red",
    hex: "#e7000b",
  },
  {
    title: "Rose",
    value: "rose",
    hex: "#ec003f",
  },
  {
    title: "Violet",
    value: "violet",
    hex: "#7f22fe",
  },
  {
    title: "Yellow",
    value: "yellow",
    hex: "#fcc800",
  },
];
