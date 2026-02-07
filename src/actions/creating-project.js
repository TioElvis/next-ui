import fs from "node:fs";

import chalk from "chalk";

import { context } from "../main.js";
import { Exception } from "../lib/exception.js";

export function creatingProject() {
  console.log(chalk.white(`Creating project "${context.projectName}"...`));

  if (fs.existsSync(context.dest)) {
    throw new Exception(
      `Directory ${context.projectName} already exists. Choose a different project name.`,
    );
  }

  try {
    fs.mkdirSync(context.dest, { recursive: true });
    console.log(chalk.green(`Created "${context.projectName}" folder.`));
  } catch (error) {
    throw new Exception(`Could not create project folder: ${error.message}`);
  }
}
