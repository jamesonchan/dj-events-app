module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'cf477f1e2a9740501050b8c951c1c131'),
  },
});
