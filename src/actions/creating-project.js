import fs from "node:fs";

import chalk from "chalk";

import { context } from "../main.js";
import { Exception } from "../lib/exception.js";

export function creatingProject() {
  if (fs.existsSync(context.dest)) {
    throw new Error(
      `Directory ${context.projectName} already exists. Choose a different project name.`,
    );
  }

  try {
    fs.mkdirSync(context.dest, { recursive: true });
    console.log(
      chalk.white(
        `\n${chalk.green("✔")} Creating project ${context.projectName}.`,
      ),
    );
  } catch (error) {
    throw new Exception(
      `Could not create project folder: ${error.message}`,
      true,
    );
  }
}
