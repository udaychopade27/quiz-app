import * as dotenv from "dotenv";
dotenv.config();

const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

// Setup express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize Keycloak
const keycloakConfig = {
  realm: process.env.KEYCLOAK_REALM,
  'auth-server-url': process.env.KEYCLOAK_AUTH_SERVER_URL,
  'ssl-required': 'external',
  resource: process.env.KEYCLOAK_CLIENT_ID,
  'confidential-port': 0,
  'bearer-only': true
};

const keycloak = new Keycloak({ store: session }, keycloakConfig);

// Middleware to protect routes
app.use(keycloak.middleware());

// Login endpoint
app.get('/login', keycloak.protect(), (req, res) => {
  res.redirect('/');
});

// Callback endpoint
app.get('/callback', keycloak.protect(), (req, res) => {
  res.redirect('/');
});
