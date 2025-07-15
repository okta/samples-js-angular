/* eslint-disable consistent-return, no-console */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

function cloneRepository(repository, directory, branch = 'master') {
  const dir = path.join(__dirname, '..', directory);
  if (fs.existsSync(dir)) {
    console.log(`${directory} is already cloned. Getting latest version...`);
    execSync(`cd ${directory} && git reset --hard && git pull`)
    return;
  }

  const command = `git clone --single-branch --branch ${branch} ${repository}`;
  console.log(`Cloning repository ${directory}`);
  execSync(command);
}

function installDependencies(directory) {
  const dir = path.resolve(__dirname, '..', directory);
  execSync(`cd ${dir} && npm install`);
}

cloneRepository('https://github.com/okta/samples-nodejs-express-4.git', 'samples-nodejs-express-4');
execSync(`cd ${path.join(__dirname, '..', 'samples-nodejs-express-4')} && npm install --unsafe-perm`);
cloneRepository('https://github.com/okta/okta-oidc-tck.git', 'okta-oidc-tck');
execSync(`cd ${path.join(__dirname, '..', 'okta-oidc-tck')} && git checkout 25db149cac9f678a553d0975966eebc0724a4ad7`);   // workaround
installDependencies('okta-oidc-tck/e2e-tests');
