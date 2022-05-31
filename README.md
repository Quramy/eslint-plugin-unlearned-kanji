# ESLint plugin

ESLint rule to ban unlearned kanji for Japanese elementary student.

```sh
$ npm i @quramy/eslint-plugin-unlearned-kanji -D
```

```js
/* .eslintrc.js */

modules.exports = {
  plugins: ["@quramy/unlearned-kanji"],
  rules: {
    "@quramy/unlearned-kanji/no-unlearned-kanji": "warn",
  },
};
```
