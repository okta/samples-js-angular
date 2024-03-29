# Okta Angular + Custom Login Example

This example shows you how to use the [Okta Angular Library][] to login a user to an Angular application.  The login is achieved with the [Okta Sign In Widget][], which gives you more control to customize the login experience within your app.

This example is built with [Angular CLI][].

## Prerequisites

Before running this sample, you will need the following:

* An Okta Developer Account, you can sign up for one at https://developer.okta.com/signup/.
* An Okta Application, configured for Singe-Page App (SPA) mode. This is done from the Okta Developer Console and you can find instructions [here][OIDC SPA Setup Instructions].  When following the wizard, use the default properties.  They are are designed to work with our sample applications.


## Running This Example

To run this application, you first need to clone this repo and then enter into this directory:

```bash
git clone https://github.com/okta/samples-js-angular.git
cd samples-js-angular/custom-login
```

Then install dependencies:

```bash
npm install
```

Now you need to gather the following information from the Okta Developer Console:

- **Client Id** - The client ID of the SPA application that you created earlier. This can be found on the "General" tab of an application, or the list of applications.  This identifies the application that tokens will be minted for.
- **Issuer** - This is the URL of the authorization server that will perform authentication.  All Developer Accounts have a "default" authorization server.  The issuer is a combination of your Org URL (found in the upper right of the console home page) and `/oauth2/default`. For example, `https://dev-1234.oktapreview.com/oauth2/default`.

These values must exist as environment variables. They can be exported in the shell, or saved in a file named `testenv`, at the root of this repository. (This is the parent directory, relative to this README) See [dotenv](https://www.npmjs.com/package/dotenv) for more details on this file format.

```ini
ISSUER=https://yourOktaDomain.com/oauth2/default
CLIENT_ID=123xxxxx123
```

> NOTE: If you are running the sample against an org that does not have [Okta's Identity
Engine](https://developer.okta.com/docs/concepts/ie-intro/) enabled, you will need to add the following environment variable to your `testenv` file 
> USE_CLASSIC_ENGINE=true

Now start the app server:

```
ng serve
```

>  **Note:** If you're on a windows machine, you might get an error similar to
> `ng serve contains error Unknown browser query basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")`
>
> It's a [known issue](https://github.com/angular/angular-cli/issues/5075) on windows due to one of the dependencies we use. To resolve the issue, search for browserslist and browserslist.cmd files in your node_modules. Delete both the files and start the app server again.


Now navigate to http://localhost:8080 in your browser.

If you see a home page that prompts you to login, then things are working!  Clicking the **Log in** button will render a custom login page component that uses the Okta Sign-In Widget to perform authentication.

You can login with the same account that you created when signing up for your Developer Org, or you can use a known username and password from your Okta Directory.

> **Note:** If you are currently using your Developer Console, you already have a Single Sign-On (SSO) session for your Org.  You will be automatically logged into your application as the same user that is using the Developer Console.  You may want to use an incognito tab to test the flow from a blank slate.


## Integrating The Resource Server

This sample contains the same "Messages" page that is included in the [Okta Hosted Login](/okta-hosted-login) sample, please refer to that sample for instructions on setting up the resource server.

[Angular CLI]: https://cli.angular.io/
[Okta Angular Library]: https://github.com/okta/okta-oidc-js/tree/master/packages/okta-angular
[PKCE Flow]: https://developer.okta.com/docs/guides/implement-auth-code-pkce
[OIDC SPA Setup Instructions]: https://developer.okta.com/docs/guides/sign-into-spa/angular/before-you-begin
[Okta Sign In Widget]: https://github.com/okta/okta-signin-widget
