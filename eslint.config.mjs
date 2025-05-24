// import js from "@eslint/js";
// import globals from "globals";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
// ]);

// eslint.config.mjs
// eslint.config.mjs
import js from "@eslint/js";

export default [
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...js.configs.recommended.languageOptions.globals,
        // Define ambiente de navegador
        window: "readonly",
        document: "readonly",
        console: "readonly",
        HTMLElement: "readonly",
      },
    },
  },
  {
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
