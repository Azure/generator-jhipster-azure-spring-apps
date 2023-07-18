module.exports = {
  recursive: true,
  reporter: "spec",
  slow: 0,
  timeout: 30000,
  retries: 2,
  ui: "bdd",
  extension: ["spec.js", "spec.cjs", "spec.mjs"],
  exclude: ["**/resources/**", "**/node_modules/**"],
  parallel: true,
};
