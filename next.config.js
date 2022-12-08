/** @type {import('next').NextConfig} */

// setting proxy for Cypress.io to allow calls to API
// https://nextjs.org/docs/api-reference/next.config.js/rewrites

const rewrites = () => {
  return [
    {
      source: "/api/:endpoint*",
      destination: `${process.env.NEXT_PUBLIC_API_URL}/:endpoint*`,
    },
  ];
};

const nextConfig = {
  reactStrictMode: true,
  rewrites,
};

module.exports = nextConfig;
