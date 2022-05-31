import { RuleTester } from "eslint";

import rule from "./no-unlearned-kanji";

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    jsx: true,
  },
});

tester.run("no-jsx-button", rule, {
  valid: [
    {
      filename: "valid.tsx",
      code: `() => <div />`,
    },
  ],
  invalid: [
    {
      filename: "invalid.tsx",
      code: `() => <>愛</>`,
      errors: [{ message: /Found unlearned kanji: "愛"/ }],
    },
    {
      filename: "invalid.tsx",
      code: `() => <>愛と勇気だけがともだち</>`,
      errors: [{ message: /Found unlearned kanji: "愛"/ }, { message: /Found unlearned kanji: "勇"/ }],
    },
    {
      filename: "invalid.tsx",
      code: `() => <>愛と<strong>勇気</strong>だけがともだち</>`,
      errors: [{ message: /Found unlearned kanji: "愛"/ }, { message: /Found unlearned kanji: "勇"/ }],
    },
  ],
});
