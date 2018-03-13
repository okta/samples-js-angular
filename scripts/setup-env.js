let fs = require('fs')
let exec = require('child_process').exec;

if (process.env.ISSUER === undefined || process.env.CLIENT_ID === undefined) {
	console.log("[ERROR] Please set the ISSUER and CLIENT_ID Environment variables");
	return;
}

updateConfig("custom-login");
updateConfig("okta-hosted-login");
cloneRepository("https://github.com/okta/samples-java-spring-mvc.git", "samples-java-spring-mvc");
cloneRepository("https://github.com/okta/okta-oidc-tck.git", "okta-oidc-tck");

function updateConfig(directory) {
    let file = __dirname + "/../" + directory + "/src/app/.samples.config.ts"
	fs.readFile(file, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  let result = data.replace(/{clientId}/g, process.env.CLIENT_ID);
	  result = result.replace(/https:\/\/{yourOktaDomain}.com\/oauth2\/default/g, process.env.ISSUER);

	  fs.writeFile(file, result, 'utf8', function (err) {
	     if (err) return console.log(err);
	  });
	});
}

function cloneRepository(repository, directory){
    let dir = __dirname + '/../' + directory;
    if (fs.existsSync(dir)) {
	    console.log(directory + " is already cloned.");
	    return;
    }

    let command = "git clone " + repository;

    console.log("Cloning repository " + directory);
    let child = exec(command, function(err, stdout, stderr){
        if(err != null){
            return console.log(err);
        } else {
            return console.log(stdout);
        }
    });
}
