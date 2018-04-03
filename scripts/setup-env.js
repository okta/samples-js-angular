/* eslint-disable consistent-return, no-console */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Users can also provide the testenv configuration at the root folder
require('dotenv').config({path: path.join(__dirname, '..', 'testenv')});

function updateConfig(directory) {
  if (!process.env.ISSUER || !process.env.CLIENT_ID || !process.env.USERNAME || !process.env.PASSWORD) {
    console.log('[ERROR] Please set the necessary Environment variables (ISSUER, CLIENT_ID, USERNAME, PASSWORD)');
    process.exit(1);
  }

  const file = path.join(__dirname, '..', directory, '/src/app/.samples.config.ts');
  const data = fs.readFileSync(file, 'utf8');
  let result = data.replace(/{clientId}/g, process.env.CLIENT_ID);
  result = result.replace(/https:\/\/{yourOktaDomain}.com\/oauth2\/default/g, process.env.ISSUER);
  fs.writeFileSync(file, result, 'utf8');
}

function cloneRepository(repository, directory) {
  const dir = path.join(__dirname, '..', directory);
  if (fs.existsSync(dir)) {
    console.log(`${directory} is already cloned. Getting latest version...`);
    execSync(`cd ${directory} && git pull`)
    return;
  }

  const command = `git clone ${repository}`;
  console.log(`Cloning repository ${directory}`);
  execSync(command);
}

updateConfig('custom-login');
updateConfig('okta-hosted-login');
cloneRepository('https://github.com/okta/samples-java-spring-mvc.git', 'samples-java-spring-mvc');
cloneRepository('https://github.com/okta/okta-oidc-tck.git', 'okta-oidc-tck');
