# Angular Sample Applications for Okta

This repository contains several sample applications that demonstrate various Okta use-cases in your Angular application.

Each sample makes use of the [Okta Angular Library][].

Please find the sample that fits your use-case from the table below.

| Sample | Description |
|--------|-------------|
| [Okta-Hosted Login](/okta-hosted-login) | An Angular application that will redirect the user to the Okta-Hosted login page for authentication.  The user is redirected back to the Angular application after authenticating. |
| [Custom Login Page](/custom-login) | An Angular application that uses the Okta Sign-In Widget within the Angular application to authenticate the user. |


[Okta Angular Library]: https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular

## Running E2E Tests locally

E2E Tests will be run against the Custom Login and Okta-Hosted Login servers.

Run npm install in the root of the project (to install the dev dependencies for testing). This will also install the dependencies for the Custom Login and Okta-Hosted Login servers.

```bash
npm install
```
Then you need to setup the following environment variables.

```bash
export CLIENT_ID={yourAppClientId}
export OKTA_DOMAIN={yourOktaOrgDomain}
```

**NOTE:** Use only the domain part of your org url while setting OKTA_DOMAIN environment.

* E.g - If your org url is https://myorg.oktapreview.com, your OKTA_DOMAIN should be myorg.oktapreview

After setting up the environment variables, you need to run a script to update the configuration and also clone the java spring resource server repo, which will be used to test the `/messages` page in the sample application.

```bash
sh scripts/setup-env.sh
```
A final step is to update the following environment variables with username and password of the user you want to use in your tests.

Note that the USERNAME should be of the form "username@email.com".

```bash
export USERNAME={userName}
export PASSWORD={password}
```

Then run the E2E tests:

```bash
npm test
```
