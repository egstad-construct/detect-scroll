module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    "airbnb-base",
    "prettier",
    "prettier/vue",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {},
};
