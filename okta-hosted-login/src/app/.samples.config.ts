export default {
  oidc: {
    clientId: '0oai1gmnyxbdd1FJO0h7',
    issuer: 'https://dev-323697.oktapreview.com/oauth2/default',
    redirectUri: 'http://localhost:4200/implicit/callback',
    scope: 'openid profile email',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
