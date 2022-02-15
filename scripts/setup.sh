#!/bin/bash -xe

# Install required node version
export NVM_DIR="/root/.nvm"
setup_service node v12.13.0

# Revert the cache-min setting, since the internal cache does not apply to
# these repos (and causes problems in lookups)
npm config set cache-min 10

# Install dependences.
if ! npm install --ignore-scripts; then
  echo "npm install failed! Exiting..."
  exit ${FAILED_SETUP}
fi

# Run postinstall script
if ! npm run postinstall; then
  echo "npm postinstall failed! Exiting..."
  exit ${FAILED_SETUP}
fi

# DO NOT MERGE - BETA VERSION - DO NOT MERGE
echo "Installing BETA VERSION"
cd ${OKTA_HOME}/${REPO}

npm config set strict-ssl false

pushd custom-login
npm i https://artifacts.aue1d.saasure.com/artifactory/npm-topic/@okta/okta-auth-js/-/@okta/okta-auth-js@6.2.0-g663c7e0.tgz
popd

pushd okta-hosted-login
npm i https://artifacts.aue1d.saasure.com/artifactory/npm-topic/@okta/okta-auth-js/-/@okta/okta-auth-js@6.2.0-g663c7e0.tgz
popd

echo "BETA VERSION installed"
