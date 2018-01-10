#!/bin/bash

cd custom-login
npm install
cd ..
cd okta-hosted-login
npm install
cd ..

sh scripts/update-samples-config.sh
npm test
