var Twitter = require('twitter-node-client').Twitter;

module.exports = function(){
    var config = {
        "consumerKey": process.env.TWITTER_CONSUMER_KEY,
        "consumerSecret": process.env.TWITTER_CONSUMER_SECRET
    };

    return new Twitter(config);
}