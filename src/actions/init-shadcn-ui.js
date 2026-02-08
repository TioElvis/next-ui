import ora from "ora";
import chalk from "chalk";

import { context } from "../main.js";
import { runCommand } from "../lib/utils.js";
import { Exception } from "../lib/exception.js";

async function installComponents(components) {
  const spinner = ora("Installing shadcn/ui components...").start();

  try {
    for (const component of components) {
      await runCommand(
        "npx",
        ["shadcn@latest", "add", component],
        context.dest,
      );
    }

    spinner.succeed("shadcn/ui components installed.");
  } catch (error) {
    spinner.fail("Failed to install shadcn/ui components.");
    throw new Exception("Failed to install shadcn/ui components.", true);
  }
}

export async function initShadcnUI(components) {
  console.log(
    chalk.white("\nInitializing shadcn/ui with the following components:"),
  );

  components.forEach((comp) => {
    console.log(chalk.white(" - "), chalk.greenBright(comp));
  });

  if (components.length === 0) {
    console.log(chalk.yellow("No components selected."));
  }

  const spinner = ora("Installing shadcn/ui...").start();

  try {
    await runCommand(
      "npx",
      ["shadcn@latest", "init", "--base-color", "neutral"],
      context.dest,
    );

    spinner.succeed("shadcn/ui installed");
  } catch (error) {
    spinner.fail("Failed to install shadcn/ui.");
    throw new Exception("Failed to install shadcn/ui.", true);
  }

  if (components.length > 0) {
    await installComponents(components);
  }
}
