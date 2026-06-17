#!/bin/bash -xe

# Install required node version
export NVM_DIR="/root/.nvm"
setup_service node v18.19.1 &> /dev/null

npm config set registry https://registry.npmjs.org/

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
