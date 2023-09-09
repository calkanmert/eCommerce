const rateLimit = {
  auth: {
    windowMs: 5 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
  },
};

const config = {
  APP_PORT: 3200,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_SECRET || 'Cüzdan gitti müjgan. Para mühim değil de içinde resmin vardı.',
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_SECRET || 'Hayaller de güzeldi, yaşanabilseydi.',
  rateLimit,
};

export default config;
