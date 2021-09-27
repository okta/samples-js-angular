// Read environment variables from "testenv" in the repository root. Override environment vars if they are already set.
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const TESTENV = path.resolve(__dirname, '..', 'testenv');
if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}
process.env.CLIENT_ID = process.env.CLIENT_ID || process.env.SPA_CLIENT_ID;
process.env.USE_INTERACTION_CODE = process.env.USE_INTERACTION_CODE || false;

// Validate env vars
[
  'ISSUER',
  'CLIENT_ID',
  'USE_INTERACTION_CODE'
].forEach(function (key) {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} must be set. See README.md`);
  }
});

const isProd = process.env.NODE_ENV === 'production';
const appBaseHref = isProd ? '/okta-hosted-login/' : '/';

const envTemplate = `
export const environment = {
  production: ${isProd},
  appBaseHref: '${appBaseHref}',
  oidc: {
    clientId: '${process.env.CLIENT_ID}',
    issuer: '${process.env.ISSUER}',
    redirectUri: '/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: ${process.env.OKTA_TESTING_DISABLEHTTPSCHECK}
    }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000${appBaseHref}api/messages',
  },
};
`

// write the content to the respective file
const targetPath = isProd
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
fs.writeFile(targetPath, envTemplate, function (err) {
  if (err) {
     console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
