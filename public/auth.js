var loopback = require("loopback");
var path = require("path");
var app = module.exports = loopback();

var PassportConfigurator = require("loopback-component-passport").PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

app.boot(__dirname);

app.use(loopback.session({ secret: 'supersecret'}));

var config = {};
try {
    config = require("./providers.json")
} catch(err) {
    console.error("Please configure your passport strategy in `providers.json`.");
    console.error("Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.");
    process.exit(1);
}

passportConfigurator.init();

passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
});

for(var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
}