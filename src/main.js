#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";
import prompts from "prompts";

import { CWD } from "./constants.js";
import { onCancel } from "./lib/utils.js";
import { Exception } from "./lib/exception.js";
import { creatingProject } from "./actions/creating-project.js";
import { copyingTemplateFiles } from "./actions/copying-template-files.js";
import { configurePackageJson } from "./actions/configure-package-json.js";
import { installAllDependencies } from "./actions/install-all-dependencies.js";

export const context = {
  dest: "",
  projectName: null,
  packageManager: null,
  isNewProject: true,
};

process.on("SIGINT", () => onCancel());

async function bootstrap() {
  if (fs.existsSync(path.join(CWD, "next.config.ts"))) {
    context.isNewProject = false;
  }

  console.log(chalk.green("\nWelcome to @tioelvis/next-ui!"));
  console.log(
    chalk.white(
      "Interactive CLI to scaffold a Next.js project with customizable presets and configurations.\n",
    ),
  );

  if (context.isNewProject === true) {
    console.log(
      chalk.blue("Creating a new project with the following features:"),
    );
    console.log(chalk.white("- Latest version of Next.js"));
    console.log(chalk.white("- TypeScript enabled"));
    console.log(chalk.white("- Latest version of Tailwind CSS"));
    console.log(chalk.white("- Project structure inside the `src/` directory"));
    console.log(chalk.white("- '@/' alias configured to import from `src`\n"));

    try {
      const responses = await prompts(
        [
          {
            type: "text",
            name: "projectName",
            message: "What is the name of your Next.js project?",
            initial: "my-app",
          },
          {
            type: "confirm",
            name: "installDependencies",
            message: "Do you want to install dependencies now?",
            initial: true,
          },
          {
            type: (prev) => (prev ? "select" : null),
            name: "packageManager",
            message: "Which package manager do you want to use?",
            choices: [
              { title: "npm", value: "npm" },
              { title: "yarn", value: "yarn" },
              { title: "pnpm", value: "pnpm" },
            ],
            initial: 0,
          },
        ],
        { onCancel },
      );

      const { projectName, installDependencies, packageManager } = responses;

      context.projectName = projectName;
      context.dest = path.join(CWD, context.projectName);
      context.packageManager = packageManager;

      creatingProject();
      copyingTemplateFiles();
      configurePackageJson();
      if (installDependencies) {
        await installAllDependencies();
      }
      // Install shadcn if user wants to use it
      // Init theme color

      console.log(chalk.green("\nProject setup complete!"));
    } catch (error) {
      if (error instanceof Exception) {
        console.log(chalk.red(error.message));
      } else {
        console.log(chalk.red("An unexpected error occurred."));
        console.error(error);
      }
      process.exit(1);
    }
  } else {
    console.log(
      chalk.yellow("Sorry but this package only supports new projects.\n"),
    );
    process.exit(0);
  }
}

bootstrap();
