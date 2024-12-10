module.exports = [
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:1337",
        "http://localhost:3567",
        "https://wdcc-auis-staging.fly.dev/"
      ], // Your frontend domain
      headers: [
        "Content-Type",
        "Authorization",
        "st-auth-mode",
        "X-Frame-Options",
        "rid",
      ], // Add st-auth-mode
    },
  },
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
