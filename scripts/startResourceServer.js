/* eslint-disable consistent-return, no-console */

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

function startResourceServer() {
  const dir = path.join(__dirname, '..', 'samples-java-spring-mvc')
  if (!fs.existsSync(dir)) {
    console.error(`[ERROR] samples-java-spring-mvc doesn't exist.`);
    return;
  }

  if (process.env.ISSUER === undefined) {
    console.error('[ERROR] Please set the ISSUER Environment variable');
    return;
  }

  const command = `mvn -Dokta.oauth2.issuer=${process.env.ISSUER} -f samples-java-spring-mvc/resource-server/pom.xml`;

  exec(command, {maxBuffer: 1024 * 2000}, (err, stdout) => {
    if (err !== null) {
      return console.error(err);
    }
    return console.log(stdout);
  });
}

startResourceServer();
