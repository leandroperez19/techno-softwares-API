module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "plugin:prettier/recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-param-reassign": "off",
    },
};
