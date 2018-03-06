#!/bin/bash
# The environment variables (ISSUER, CLIENT_ID) are set in the travis repository settings
# Escape the backslashes in ISSUER env var
issuer=$(echo "$ISSUER" | sed 's/\//\\\//g')

sed -i -- "s/https:\/\/{yourOktaDomain}.com\/oauth2\/default/$issuer/g" okta-hosted-login/src/app/.samples.config.ts
sed -i -- "s/{clientId}/$CLIENT_ID/g" okta-hosted-login/src/app/.samples.config.ts

sed -i -- "s/https:\/\/{yourOktaDomain}.com\/oauth2\/default/$issuer/g" custom-login/src/app/.samples.config.ts
sed -i -- "s/{clientId}/$CLIENT_ID/g" custom-login/src/app/.samples.config.ts

# Clone the resource-server repo and update the environment
[ ! -d samples-java-spring-mvc/ ] && git clone https://github.com/okta/samples-java-spring-mvc.git || echo "Resource server already cloned"
