module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "global-require": "off",
    "no-underscore-dangle": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/self-closing-comp": "off",
    "no-unused-vars": "warn",
    "jsx-a11y/anchor-is-valid": "off",
    "consistent-return": "off",
    "array-callback-return": "off",
    "no-unneeded-ternary": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
  },
};
