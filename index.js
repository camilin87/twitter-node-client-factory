var Twitter = require('twitter-node-client').Twitter;

module.exports = function(accessToken, accessTokenSecret, callBackUrl,
    consumerKeyEnvSettingName, consumerSecretEnvSettingName){

    if (!consumerKeyEnvSettingName){
        consumerKeyEnvSettingName = "TWITTER_CONSUMER_KEY";
    }

    if (!consumerSecretEnvSettingName){
        consumerSecretEnvSettingName = "TWITTER_CONSUMER_SECRET";
    }

    var config = {
        "consumerKey": process.env[consumerKeyEnvSettingName],
        "consumerSecret": process.env[consumerSecretEnvSettingName]
    };

    if (accessToken){
        config.accessToken = accessToken;
    }

    if (accessTokenSecret){
        config.accessTokenSecret = accessTokenSecret;
    }

    if (callBackUrl){
        config.callBackUrl = callBackUrl;
    }

    return new Twitter(config);
}