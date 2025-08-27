// .eslintrc.js
module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["**/design/figma/**"],
            message:
              "Do not import from design/figma at runtime. Copy to components/ui or components/flow.",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["pages/api/**/*.ts"],
      rules: { "@typescript-eslint/no-explicit-any": "off" },
    },
    {
      files: [
        "components/flow/PaymentPanel.tsx",
        "components/flow/Charging.tsx",
        "components/flow/Overview.tsx",
        "components/flow/TransactionGate.tsx",
      ],
      rules: { "@typescript-eslint/no-explicit-any": "off" },
    },
  ],
};
