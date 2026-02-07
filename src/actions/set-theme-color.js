import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";

import { context } from "../main.js";
import { Exception } from "../lib/exception.js";
import { THEME_FOLDER_PATH } from "../constants.js";

export function setThemeColor(themeColor) {
  const themeFilePath = path.join(THEME_FOLDER_PATH, `${themeColor}.css`);

  try {
    if (!themeColor || !fs.existsSync(themeFilePath)) {
      throw new Error("Invalid theme color selected.");
    }

    const dest = path.join(context.dest, "src/app/globals.css");

    fs.copyFileSync(themeFilePath, dest);
    console.log(chalk.white("\nTheme color set successfully."));
  } catch (error) {
    throw new Exception(`Could not set theme color: ${error.message}`);
  }
}
