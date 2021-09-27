
export const environment = {
  production: false,
  appBaseHref: '/',
  oidc: {
    clientId: '0oapmwm72082GXal14x6',
    issuer: 'https://samples-javascript.okta.com/oauth2/default',
    redirectUri: '/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: undefined
    }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
