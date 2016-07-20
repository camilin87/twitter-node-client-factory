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

    var originalGet = result.oauth.get;
    result.oauth.get = function(url, accessToken, accessTokenSecret, callback){
        return originalGet.apply(result.oauth, [
            url,
            accessToken,
            accessTokenSecret,
            callbackWithLimitLogging(callback, "Get")
        ]);
    };

    var originalPost = result.oauth.post;
    result.oauth.post = function(url, accessToken, accessTokenSecret, post_body, contentType, callback){
        return originalPost.apply(result.oauth, [
            url,
            accessToken,
            accessTokenSecret,
            post_body,
            contentType,
            callbackWithLimitLogging(callback, "Post")
        ]);
    };

    function callbackWithLimitLogging(callback, methodName){
        return (err, body, response) => {
            console.log("TwitterClient." + methodName,
                "X-Rate-Limit-Limit:",
                response.headers["x-rate-limit-limit"],
                "X-Rate-Limit-Remaining:",
                response.headers["x-rate-limit-remaining"],
                "X-Rate-Limit-Reset:",
                response.headers["x-rate-limit-reset"]
            );

            callback(err, body, response);
        };
    }

    return result;
}