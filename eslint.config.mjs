/// Import necessary modules and packages

// Globals: Provides predefined global variables for different environments (browsers, node, etc.)
import globals from "globals";

// Js: Core ESLint recommended configurations and rules
import js from "@eslint/js";

// FlatCompat: Helps migrate older ESLint config formats to new flat config system
// Used to import the p5js config presets, which are in an older format.
import { FlatCompat } from "@eslint/eslintrc";

/// configure the compatibility utility
const compat = new FlatCompat({
  baseDirectory: new URL(".", import.meta.url).pathname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/// The configuration
export default [
  // Extend recommended ESLint configurations and p5.js specific configurations
  ...compat.extends("eslint:recommended", "p5js", "p5js/sound"),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        partyConnect: "readonly",
        partyLoadShared: "readonly",
        partySetShared: "readonly",
        partyWatchShared: "readonly",
        partyIsHost: "readonly",
        partyLoadMyShared: "readonly",
        partyLoadGuestShareds: "readonly",
        partySubscribe: "readonly",
        partyUnsubscribe: "readonly",
        partyEmit: "readonly",
        partyToggleInfo: "readonly",
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },

    rules: {
      // formatting that should get fixed by prettier
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "max-len": ["error", { code: 100 }],

      // style
      "prefer-const": ["error"],
      "no-var": ["error"],
      "no-unused-vars": ["error"],
      "camelcase": ["error"],
      "eqeqeq": ["error", "smart"],
      "comma-spacing": ["error", { before: false, after: true }],
      "keyword-spacing": ["error"],
      "space-before-blocks": ["error"],
      "no-trailing-spaces": ["error"],
      "curly": ["error", "multi-line", "consistent"],
    },
  },
];
