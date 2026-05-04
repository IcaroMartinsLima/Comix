module.exports = {
  root: true,

  extends: ["expo", "prettier"],

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  rules: {
    "no-unused-vars": "warn",
    "no-console": "warn",

    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "react-native/no-inline-styles": "off",

    "comma-dangle": "off",
  },
};
