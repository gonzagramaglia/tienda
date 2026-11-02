const excludedPaths = ["/studio", "/studio/*"]

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://mitienda.com",
  generateRobotsTxt: true,
  exclude: excludedPaths,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: excludedPaths,
      },
    ],
  },
}
