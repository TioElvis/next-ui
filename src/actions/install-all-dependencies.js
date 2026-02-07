import ora from "ora";

import { context } from "../main.js";
import { runCommand } from "../lib/utils.js";
import { Exception } from "../lib/exception.js";
import { MAIN_DEPENDENCIES, MAIN_DEV_DEPENDENCIES } from "../constants.js";

export async function installAllDependencies() {
  const spinner = ora("Installing main packages...").start();

  const { packageManager: pm, dest } = context;

  try {
    await runCommand(pm, ["install", ...MAIN_DEPENDENCIES], dest);
    await runCommand(pm, ["install", "-D", ...MAIN_DEV_DEPENDENCIES], dest);

    spinner.succeed("Main packages installed successfully.");
  } catch (error) {
    spinner.fail("Failed to install main packages.");
    throw new Exception(`Failed to install main packages: ${error.message}`);
  }
}
