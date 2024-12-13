// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// console.log(
//   '$$ ...compat.extends("next/core-web-vitals", "next/typescript")',
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// );

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   "plugin:prettier/recommended",
// ];

// export default eslintConfig;

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

/**
 * @description 5팀 화이팅 😘
 * @author kiJu2
 */
const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    settings: {
      next: {
        rootDir: "src/",
      },
    },
  }),
];

export default eslintConfig;
