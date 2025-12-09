import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn'
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module"
    }
  }
];