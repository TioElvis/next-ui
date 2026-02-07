import { promisify } from "node:util";
import { exec } from "node:child_process";

import chalk from "chalk";

import { Exception } from "./exception.js";

const execPromise = promisify(exec);

export function onCancel() {
  console.log(chalk.red("\nOperation cancelled."));
  process.exit(0);
}

export async function runCommand(command, args = [], cwd = process.cwd()) {
  try {
    await execPromise(`${command} ${args.join(" ")}`, { cwd });
  } catch (error) {
    throw new Exception(`Failed to run command: ${error.message}`);
  }
}
