import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";

import { context } from "../main.js";
import { Exception } from "../lib/exception.js";

export function configurePackageJson() {
  console.log(chalk.white("\nConfiguring package.json..."));

  const packageJSON = {
    name: context.projectName,
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
  };

  const packageJsonPath = path.join(context.dest, "package.json");

  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJSON, null, 2));
    console.log(chalk.green("package.json configured successfully."));
  } catch (error) {
    throw new Exception("Failed to configure package.json. Please try again.");
  }
}
