//requiring all the dependencies
//dotenv
require('dotenv').config();
const keys = require('./keys.js');
//Spotify
const Spotify = require('node-spotify-api');
//Twitter
const Twitter = require('twitter');
//request
const request = require('request');
//file system
const fs = require('fs');
//using dotenv to supply API keys
//spotify api keys
const spotify = new Spotify(keys.spotify);
//twitter
const client = new Twitter(keys.twitter);
//dynamically choose which api to use
// const api = process.argv[2];
//function to run twitter npm module with search parameters
const apiCall = api => {
    const tweet = () => {
        //parameters for twitter api
        let params = {
            q: 'dragnosfall',
            count: 20,
            lang: 'en'
        };
        client.get('search/tweets', params, (error, tweets, response) => {
            if (error) {
                return console.log(error);
            }
            console.log("-----------------");
            for (let i = 0; i < tweets.statuses.length; i++) {
                console.log(tweets.statuses[i].text + '\n' + tweets.statuses[i].created_at);
                console.log("-----------------");

            }
        });
    }
}
