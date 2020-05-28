const { default: AdminBro } = require('admin-bro');
const AdminBroExpressjs = require('admin-bro-expressjs')
const express = require('express');

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@example.com', //need to get real email and password and store in env variables
    password: process.env.ADMIN_PASSWORD || 'lovejs',
  }
  
const buildAdminRouter = (admin) => {
  const router = AdminBroExpressjs.buildAuthenticatedRouter(admin, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro', //need to get reall cookie name and pass word and store in env variables
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN
      }
      return null
    },
  });
  return router;
};
module.exports = buildAdminRouter;

