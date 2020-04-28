const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

// session support is required to use ExpressOIDC
const oidcSession = (session({
  secret: process.env.OIDC_SECRET,
  resave: true,
  saveUninitialized: false
}));

const oidc = new ExpressOIDC({
  issuer: 'https://dev-816550.okta.com/oauth2/default',
  client_id: '0oa5gc0yq1ZZiVWL34x6',
  client_secret: '_krlbyauX7wb1nfyy4n3VKWLEG34k7o_oAMgeUoA',
  appBaseUrl: 'http://localhost:3000',
  redirect_uri: 'http://localhost:7555/authorization-code/callback',
  scope: 'openid profile'
});

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
// app.use(oidc.router);

module.exports = { oidcSession, oidc }