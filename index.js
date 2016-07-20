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

    var result = new Twitter(config);

    var prevGet = result.oauth.get;
    result.oauth.get = function(url, accessToken, accessTokenSecret, callback){
        return prevGet(url, accessToken, accessTokenSecret, (err, body, response) => {
            console.log("TwitterClient.Get",
                "X-Rate-Limit-Limit",
                response.headers["x-rate-limit-limit"],
                "X-Rate-Limit-Remaining",
                response.headers["x-rate-limit-remaining"],
                "X-Rate-Limit-Reset",
                response.headers["x-rate-limit-reset"]
            );

            callback(err, body, response);
        });
    };

    var prevPost = result.oauth.post;
    result.oauth.post = function(url, accessToken, accessTokenSecret, post_body, contentType, callback){
        return prevPost(url, accessToken, accessTokenSecret, post_body, contentType, (err, body, response) => {
            console.log("TwitterClient.Post",
                "X-Rate-Limit-Limit",
                response.headers["x-rate-limit-limit"],
                "X-Rate-Limit-Remaining",
                response.headers["x-rate-limit-remaining"],
                "X-Rate-Limit-Reset",
                response.headers["x-rate-limit-reset"]
            );

            callback(err, body, response);
        });
    };

    return result;
}