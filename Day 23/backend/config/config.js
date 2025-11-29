export const CONFIG = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};
