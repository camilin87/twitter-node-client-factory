var Twitter = require('twitter-node-client').Twitter;

module.exports = function(accessToken, accessTokenSecret, callBackUrl){
    var config = {
        "consumerKey": process.env.TWITTER_CONSUMER_KEY,
        "consumerSecret": process.env.TWITTER_CONSUMER_SECRET
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