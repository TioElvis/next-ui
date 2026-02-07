import fs from "node:fs";

import chalk from "chalk";

import { context } from "../main.js";
import { Exception } from "../lib/exception.js";
import { TEMPLATE_FOLDER_PATH } from "../constants.js";

export function copyingTemplateFiles() {
  console.log(chalk.white(`Copying template files...`));

  try {
    fs.cpSync(TEMPLATE_FOLDER_PATH, context.dest, { recursive: true });
    console.log(chalk.green("Template files copied successfully."));
  } catch (error) {
    throw new Exception(`Could not copy template files: ${error.message}`);
  }
}
