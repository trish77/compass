module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "indent": "off",
    "quotes": "off",
    'generator-star-spacing': 'off',
    'no-trailing-spaces': 'off',
  },

  parserOptions: {
    parser: "babel-eslint"
  },
  plugins:[
    //"prettier"
  ],
};
