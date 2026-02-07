import path from "node:path";
import { fileURLToPath } from "node:url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const CWD = path.resolve(process.cwd());

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
  "eslint@latest",
  "eslint-config-next@latest",
  "tailwindcss@latest",
  "typescript@latest",
];
