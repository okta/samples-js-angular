source ${OKTA_HOME}/${REPO}/scripts/setup.sh

setup_service xvfb start
setup_service java 1.8.222
setup_service google-chrome-stable 87.0.4280.66-1

yum -y install lsof

cd ${OKTA_HOME}/${REPO}

function run_tests() {
    create_log_group "Pretest"
    export TEST_TYPE=implicit
    npm i -D protractor
    node ./scripts/update-se-drivers.js
    npm run setup-env
    finish_log_group $?

    create_log_group "Okta Hosted E2E"
    # npm run test:okta-hosted-login
    ./node_modules/.bin/protractor protractor.conf.js --sample=okta-hosted-login
    finish_log_group $?

    # kill app and resource servers
    kill -s TERM $(lsof -t -i:8080 -sTCP:LISTEN)
    kill -s TERM $(lsof -t -i:8000 -sTCP:LISTEN)
    
    create_log_group "Custom Login E2E"
    # npm run test:custom-login
    ./node_modules/.bin/protractor protractor.conf.js --sample=custom-login
    finish_log_group $?
}