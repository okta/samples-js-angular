#!/bin/bash -xe

# Add yarn to the $PATH so npm cli commands do not fail
export PATH="${PATH}:$(yarn global bin)"

# Install required node version
export NVM_DIR="/root/.nvm"
setup_service node v12.13.0

# Revert the cache-min setting, since the internal cache does not apply to
# these repos (and causes problems in lookups)
npm config set cache-min 10
npm config set scripts-prepend-node-path auto

# Use the cacert bundled with centos as okta root CA is self-signed and cause issues downloading from yarn
setup_service yarn 1.21.1 /etc/pki/tls/certs/ca-bundle.crt

# Install dependences.
if ! yarn install --frozen-lockfile --ignore-scripts; then
  echo "yarn install failed! Exiting..."
  exit ${FAILED_SETUP}
fi

# Run postinstall script
if ! yarn postinstall; then
  echo "yarn postinstall failed! Exiting..."
  exit ${FAILED_SETUP}
fi
