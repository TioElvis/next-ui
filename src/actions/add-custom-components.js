import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";

import {
  CUSTOM_COMPONENTS,
  CUSTOM_COMPONENTS_FOLDER_PATH,
  MAIN_DEPENDENCIES,
  MAIN_DEV_DEPENDENCIES,
} from "../constants.js";
import { context } from "../main.js";
import { Exception } from "../lib/exception.js";

export function addingCustomComponents(components) {
  console.log(chalk.white("\nAdding custom components components:"));

  if (components.length === 0) {
    console.log(chalk.yellow("No components selected."));
    return;
  }

  try {
    for (const component of components) {
      const componentJSON = path.join(
        CUSTOM_COMPONENTS_FOLDER_PATH,
        `${component}.json`,
      );

      if (!fs.existsSync(componentJSON)) {
        throw new Error("Don't exist a json from this component.");
      }

      const fileContent = fs.readFileSync(componentJSON, "utf-8");
      const componentData = JSON.parse(fileContent);

      if (componentData.shadcnNeeded && !context.useShadcnUI) {
        throw new Error(
          `You must use shadcn to use this component: ${component}.`,
        );
      }

      let componentSrc;

      if (componentData.isFolder === true) {
        componentSrc = path.join(
          CUSTOM_COMPONENTS_FOLDER_PATH,
          componentData.componentFolder,
        );
      } else {
        componentSrc = path.join(
          CUSTOM_COMPONENTS_FOLDER_PATH,
          `${component}${componentData.componentFileExtension}`,
        );
      }

      if (!fs.existsSync(componentSrc)) {
        throw new Error(
          "Don't exist a source file or folder for this component",
        );
      }

      const componentDest = path.join(context.dest, "src", "components");

      if (!fs.existsSync(componentDest)) {
        fs.mkdirSync(componentDest);
      }

      console.log(
        chalk.white(" - "),
        chalk.greenBright(
          CUSTOM_COMPONENTS.find((comp) => comp.value === component).title,
        ),
      );

      const shadcnComponentsNeeded = componentData.shadcnComponentsNeeded;
      const dependenciesNeeded = componentData.dependenciesNeeded;
      const devDependenciesNeeded = componentData.devDependenciesNeeded;

      for (const dep of dependenciesNeeded) {
        if (!MAIN_DEPENDENCIES.includes(dep)) {
          MAIN_DEPENDENCIES.push(dep);
        }
      }

      for (const devDep of devDependenciesNeeded) {
        if (!MAIN_DEV_DEPENDENCIES.includes(devDep)) {
          MAIN_DEV_DEPENDENCIES.push(devDep);
        }
      }

      for (const comp of shadcnComponentsNeeded) {
        if (!context.shadcnComponents.includes(comp)) {
          context.shadcnComponents.push(comp);
        }
      }

      fs.cpSync(componentSrc, componentDest, { recursive: true });
    }

    console.log(chalk.white(`${chalk.green("✔")} Copying custom components.`));
  } catch (error) {
    throw new Exception(
      `Failed to initialize custom components: ${error.message}`,
      true,
    );
  }
}
