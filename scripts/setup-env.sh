#!/bin/bash
# The environment variables (OKTA_DOMAIN, CLIENT_ID) are set in the travis repository settings
sed -i -- "s/{yourOktaDomain}/$OKTA_DOMAIN/g" okta-hosted-login/src/app/.samples.config.ts
sed -i -- "s/{clientId}/$CLIENT_ID/g" okta-hosted-login/src/app/.samples.config.ts

sed -i -- "s/{yourOktaDomain}/$OKTA_DOMAIN/g" custom-login/src/app/.samples.config.ts
sed -i -- "s/{clientId}/$CLIENT_ID/g" custom-login/src/app/.samples.config.ts

# Clone the resource-server repo and update the environment
[ ! -d samples-java-spring-mvc/ ] && git clone https://github.com/okta/samples-java-spring-mvc.git || echo "Resource server already cloned"
