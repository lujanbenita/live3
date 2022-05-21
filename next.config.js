require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  basePath: process.env.BASE_PATH,
  env: {
    PUBLIC_URL: process.env.BASE_PATH,
    ALVA_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  sassOptions: {
    prependData: `$basePath: '${process.env.BASE_PATH}';`,
  },
  webpack5: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
