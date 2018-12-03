const express = require('express');
const Twitter = require('twit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

app.use(require('cors')());

//this is needed to get POST parameters
app.use(require('body-parser').json());


// app.post('/api/tweet', (req, res) => {
//   client
//   .post('statuses/update', { status: tweetText }
//   .then(tweet => {}) function (err, data, response) {
//   console.log(data)
// })

// T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
//   console.log(data)
// })

//API call to search/tweets to pull relevant tweets based on queries performed
//retrieves json object of 100 tweets relevant to the query: "banana"
app.get('/api/search', (req, res) => {
  console.log('/api/search');

//localhost:3000/api/search?q={{searchQuery}}
const searchQuery = req.query.q;

  client
  .get('search/tweets', { q: searchQuery, count: 100 })
  .then(search => {
    res.send(search);
  })
  .catch(error => {
    res.send(error);
    console.log("couldn't search");
  });
});

//API call to account/verify_credentials to pull user data onto endpoint /api/user
app.get('/api/user', (req, res) => {
  console.log("/api/user");

  client
    .get('account/verify_credentials')
    .then(user => {
      res.send(user);

    })
    .catch(error => {
      res.send(error)
      console.log("failure!!!!!!!!");
    });
});

let cache = [];
let cacheAge = 0;

app.get('/api/home', (req, res) => {
  if (Date.now() - cacheAge > 60000) {
    console.log('60 seconds elapsed');
    cacheAge = Date.now();
    const params = { tweet_mode: 'extended', count: 5 };
    if (req.query.since) {
      params.since_id = req.query.since;
    }
    client
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
        cache = timeline;
        res.send(timeline);
      })
      .catch(error => res.send(error));
  } else {
    res.send(cache);
  }
});

app.post('/api/favorite/:id', (req, res) => {
  const path = req.body.state ? 'create' : 'destroy';
   client
     .post(`favorites/${path}`, { id: req.params.id })
     .then(tweet => res.send(tweet))
     .catch(error => res.send(error));
});

app.post('/api/retweet/:id', (req, res) => {
  const path = req.body.state ? 'retweet' : 'unretweet';
  client
    .post(`statuses/${path}/${req.params.id}`)
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});

app.post('/api/statuses/update', (req, res) => {
  const tweet = req.query.status;
  client
  .post('statuses/update', { status: tweet })
  .then(tweeted => res.send(tweeted))
  .catch(error => res.send(error));
});

app.listen(3000, () => console.log('Server running'));
