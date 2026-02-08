import path from "node:path";
import { fileURLToPath } from "node:url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const CWD = path.resolve(process.cwd());

export const THEME_FOLDER_PATH = path.join(__dirname, "themes");
export const TEMPLATE_FOLDER_PATH = path.join(__dirname, "template");

export const MAIN_DEPENDENCIES = [
  "next@latest",
  "react@latest",
  "react-dom@latest",
];

export const MAIN_DEV_DEPENDENCIES = [
  "@tailwindcss/postcss@latest",
  "@types/node@latest",
  "@types/react@latest",
  "@types/react-dom@latest",
  "eslint@latest",
  "eslint-config-next@latest",
  "tailwindcss@latest",
  "typescript@latest",
  "tw-animate-css@latest",
];

export const THEME_COLORS = [
  {
    title: "Default",
    value: "default",
    hex: "#171717",
  },
  {
    title: "Blue",
    value: "blue",
    hex: "#1447e6",
  },
  {
    title: "Green",
    value: "green",
    hex: "#5ea500",
  },
  {
    title: "Orange",
    value: "orange",
    hex: "#f54a00",
  },
  {
    title: "Red",
    value: "red",
    hex: "#e7000b",
  },
  {
    title: "Rose",
    value: "rose",
    hex: "#ec003f",
  },
  {
    title: "Violet",
    value: "violet",
    hex: "#7f22fe",
  },
  {
    title: "Yellow",
    value: "yellow",
    hex: "#fcc800",
  },
];

export const SHADCN_COMPONENTS = [
  {
    title: "Accordion",
    value: "accordion",
    description: "Collapsible content panels.",
  },
  {
    title: "Alert",
    value: "alert",
    description: "Display important messages.",
  },
  {
    title: "Alert Dialog",
    value: "alert-dialog",
    description: "Modal dialog for critical actions.",
  },
  {
    title: "Aspect Ratio",
    value: "aspect-ratio",
    description: "Maintain consistent aspect ratios.",
  },
  {
    title: "Avatar",
    value: "avatar",
    description: "User profile images.",
  },
  {
    title: "Badge",
    value: "badge",
    description: "Small labels and tags.",
  },
  {
    title: "Breadcrumb",
    value: "breadcrumb",
    description: "Navigation path indicator.",
  },
  {
    title: "Button",
    value: "button",
    description: "Interactive clickable elements.",
  },
  {
    title: "Button Group",
    value: "button-group",
    description: "Group of buttons with shared actions.",
  },
  {
    title: "Calendar",
    value: "calendar",
    description: "Date selection component.",
  },
  {
    title: "Card",
    value: "card",
    description: "Container for grouped content.",
  },
  {
    title: "Carousel",
    value: "carousel",
    description: "Image and content slider.",
  },
  {
    title: "Chart",
    value: "chart",
    description: "Data visualization component.",
  },
  {
    title: "Checkbox",
    value: "checkbox",
    description: "Multi-select input.",
  },
  {
    title: "Collapsible",
    value: "collapsible",
    description: "Toggle expandable sections.",
  },
  {
    title: "Combobox",
    value: "combobox",
    description: "Dropdown input with search functionality.",
  },
  {
    title: "Command",
    value: "command",
    description: "Command palette interface.",
  },
  {
    title: "Context Menu",
    value: "context-menu",
    description: "Right-click menu.",
  },
  {
    title: "Dialog",
    value: "dialog",
    description: "Modal dialog box.",
  },
  {
    title: "Direction",
    value: "direction",
    description: "Sets the text direction for your application.",
  },
  {
    title: "Drawer",
    value: "drawer",
    description: "Side panel overlay.",
  },
  {
    title: "Dropdown Menu",
    value: "dropdown-menu",
    description: "Dropdown action menu.",
  },
  {
    title: "Empty",
    value: "empty",
    description: "Component to display an empty state.",
  },
  {
    title: "Field",
    value: "field",
    description: "Form field component.",
  },
  {
    title: "Hover Card",
    value: "hover-card",
    description: "Tooltip on hover.",
  },
  {
    title: "Input",
    value: "input",
    description: "Text input field.",
  },
  {
    title: "Input Group",
    value: "input-group",
    description: "Add addons, buttons, and helper content to inputs.",
  },
  {
    title: "Input OTP",
    value: "input-otp",
    description: "One-time password input.",
  },
  {
    title: "Item",
    value: "item",
    description: "Versatile component for displaying content.",
  },
  {
    title: "Kbd",
    value: "kbd",
    description: "Used to display textual user input from keyboard.",
  },
  {
    title: "Label",
    value: "label",
    description: "Form field label.",
  },
  {
    title: "Menubar",
    value: "menubar",
    description: "Application menu bar.",
  },
  {
    title: "Native Select",
    value: "native-select",
    description: "Native select dropdown.",
  },
  {
    title: "Navigation Menu",
    value: "navigation-menu",
    description: "Horizontal navigation.",
  },
  {
    title: "Pagination",
    value: "pagination",
    description: "Page navigation controls.",
  },
  {
    title: "Popover",
    value: "popover",
    description: "Floating content box.",
  },
  {
    title: "Progress",
    value: "progress",
    description: "Progress bar indicator.",
  },
  {
    title: "Radio Group",
    value: "radio-group",
    description: "Single-select option group.",
  },
  {
    title: "Resizable",
    value: "resizable",
    description: "Resizable panel container.",
  },
  {
    title: "Scroll Area",
    value: "scroll-area",
    description: "Custom scrollable container.",
  },
  {
    title: "Select",
    value: "select",
    description: "Dropdown select field.",
  },
  {
    title: "Separator",
    value: "separator",
    description: "Visual divider line",
  },
  {
    title: "Sheet",
    value: "sheet",
    description: "Modal sheet panel.",
  },
  {
    title: "Sidebar",
    value: "sidebar",
    description: "Side navigation panel.",
  },
  {
    title: "Skeleton",
    value: "skeleton",
    description: "Loading placeholder.",
  },
  {
    title: "Slider",
    value: "slider",
    description: "Range slider input.",
  },
  {
    title: "Sonner",
    value: "sonner",
    description: "Toast notification system.",
  },
  {
    title: "Switch",
    value: "switch",
    description: "Toggle switch control.",
  },
  {
    title: "Table",
    value: "table",
    description: "Data table component.",
  },
  {
    title: "Tabs",
    value: "tabs",
    description: "Tabbed content sections.",
  },
  {
    title: "Textarea",
    value: "textarea",
    description: "Multi-line text input.",
  },
  {
    title: "Toggle",
    value: "toggle",
    description: "Toggle button control.",
  },
  {
    title: "Toggle Group",
    value: "toggle-group",
    description: "Group of toggle buttons.",
  },
  {
    title: "Tooltip",
    value: "tooltip",
    description: "Informative hover text.",
  },
];
