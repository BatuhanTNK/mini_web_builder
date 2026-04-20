const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Çok fazla giriş denemesi, lütfen daha sonra tekrar deneyin.' }
});

module.exports = { apiLimiter, authLimiter };
