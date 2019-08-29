const { CLIENT_ID, ISSUER } = process.env;

export default {
  oidc: {
    clientId: `${CLIENT_ID}`,
    issuer: `${ISSUER}`,
    redirectUri: 'http://localhost:8080/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    testing: {
      disableHttpsCheck: false
    }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
