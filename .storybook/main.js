const tailwindcss = require("tailwindcss");
const path = require("path");

module.exports = {
  core: {
    builder: "webpack5"
  },
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/manager-webpack5",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss")
        }
      }
    }
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                tailwindcss("./tailwind.config.js"),
                require("autoprefixer")
              ],
            }
          },
        },
      ],
      include: path.resolve(__dirname, '../tailwind.css'),
    })
    return config
  },
}