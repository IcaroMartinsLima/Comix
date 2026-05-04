module.exports = {
  root: true,

  extends: [
    "expo", // regras padrão do Expo / React Native
    "prettier", // desativa conflitos com Prettier
  ],

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  rules: {
    // 🔹 qualidade de código
    "no-unused-vars": "warn",
    "no-console": "warn",

    // 🔹 React
    "react/react-in-jsx-scope": "off", // não precisa no Expo
    "react/prop-types": "off",

    // 🔹 React Hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // 🔹 React Native
    "react-native/no-inline-styles": "off", // pode ligar se quiser mais rigor

    // 🔹 estilo leve (o Prettier cuida do resto)
    "comma-dangle": "off",
  },
};
