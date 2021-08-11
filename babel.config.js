module.exports = {
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        root: ["./build"],
        alias: {
          "@": "./build/src",
        },
      },
    ],
  ],
};
