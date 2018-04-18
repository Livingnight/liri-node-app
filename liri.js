//requiring all the dependencies

//dotenv
require('dotenv').config();
const keys = require('./keys.js');
//Spotify
const Spotify = require('node-spotify-api');
//Twitter
const Twitter = require('twitter');
//request
const request = require("request");

//using dotenv to supply API keys
//spotify api keys
const spotify = new Spotify(keys.spotify);
//twitter
const client = new Twitter(keys.twitter);
//dynamically choose which api to use
const api = process.argv[2];
let search = process.argv[3];
//parameters for twitter api
let params = {
    q: 'dragnosfall',
    count: 20,
    lang: 'en'
};
//twitter api call using arguments from node. finds last 20 tweets.
if(api === 'my-tweets'){
    client.get('search/tweets', params, (error, tweets, response)=> {
        if(error){
            return console.log(error);
        }
        for(let i=0; i < tweets.statuses.length; i++){
            console.log(tweets.statuses[i].text + '\n' + tweets.statuses[i].created_at);
        }
    });
//    brings back results from spotify api based on node arguments.
}else if(api === 'spotify-this-song'){
    params = {type:'track', query: search, limit:5};
    console.log(params);
    spotify.search(params, (err, data) => {
        if(err){
            console.log('error');
            return console.log(err);
        }
        console.log('made it this far');
        console.log(data);
        console.log("-----------------");
        // console.log(data.tracks.items[0]);
        // for(let i = 0; i<data.tracks.items.length; i++){
        //     console.log(JSON.parse(data).tracks.items[i].album.artists);
        // }
        // console.log(JSON.stringify(data,null,2));
        // data = JSON.stringify(data, null, 3);
    //    artist name
    //     console.log(data.tracks.items.album);
    //    The song's name

    //    A preview link of the song from spotify

    //    The album that the song is from
    })
}


// console.log(keys.config());