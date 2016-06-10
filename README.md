# twitter-node-client-factory  
Seamlessly create a [`twitter-node-client`](https://github.com/BoyCook/TwitterJSClient) while reading the configuration from the environment.  

```js
var twitterClient = require("twitter-node-client-factory")();

twitterClient.getUserTimeline({
    screen_name: 'camilin87',
    count: '10'
}, (err, response, body) {
    console.log('ERROR [%s]', err);
}, (data) {
    console.log('Data [%s]', data);
});
```

## Dependencies  
The environment variables `TWITTER_CONSUMER_KEY` and `TWITTER_CONSUMER_SECRET` should be set.
