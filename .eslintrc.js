module.exports = {
  extends: ["plugin:@typescript-eslint/recommended"],
  plugins: ["unused-imports"],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
  },
  globals: {
    JSX: true,
  },
  rules: {
    // "i18next/no-literal-string": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    // "@typescript-eslint/no-namespaces": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    "unused-imports/no-unused-imports": "error",
    // "react-hooks/exhaustive-deps": ["error"],
    "react/jsx-key": ["error", { checkFragmentShorthand: true }],
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
