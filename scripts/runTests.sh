#!/bin/bash

./node_modules/.bin/protractor okta-oidc-tck/e2e-tests/custom-login/conf.js
./node_modules/.bin/protractor okta-oidc-tck/e2e-tests/okta-hosted-login/conf.js
