export default {
  oidc: {
    clientId: '{clientId}',
    issuer: 'https://sjsu-port69.com/oauth2/v1/authorize',
    redirectUri: 'http://localhost:8080/implicit/callback',
    scope: 'openid profile email'
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
