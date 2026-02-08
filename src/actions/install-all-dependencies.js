import ora from "ora";
import chalk from "chalk";

import { context } from "../main.js";
import { runCommand } from "../lib/utils.js";
import { Exception } from "../lib/exception.js";
import { MAIN_DEPENDENCIES, MAIN_DEV_DEPENDENCIES } from "../constants.js";

export async function installAllDependencies() {
  const { packageManager: pm, dest } = context;

  console.log(chalk.white("\nInstalling dependencies:"));
  MAIN_DEPENDENCIES.forEach((dep) => {
    console.log(chalk.white(" - "), chalk.greenBright(dep));
  });

  console.log(chalk.white("\nInstalling devDependencies:"));
  MAIN_DEV_DEPENDENCIES.forEach((dep) => {
    console.log(chalk.white(" - "), chalk.greenBright(dep));
  });

  const spinner = ora("Installing main packages...").start();
  try {
    await runCommand(pm, ["install", ...MAIN_DEPENDENCIES], dest);
    await runCommand(pm, ["install", "-D", ...MAIN_DEV_DEPENDENCIES], dest);

    spinner.succeed("Dependencies installed successfully.");
  } catch (error) {
    spinner.fail("Failed to install dependencies.");
    throw new Exception(
      `Failed to install dependencies: ${error.message}`,
      true,
    );
  }
}
