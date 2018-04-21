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
//spotify api keys
const spotify = new Spotify(keys.spotify);
//twitter
const client = new Twitter(keys.twitter);
//dynamically choose which api to use
const api = process.argv[2];
//function to run twitter npm module with search parameters
const append = (file, data) => {
    fs.appendFile(file, data, function (err) {
        if (err) {
            return console.log(err);
        }
    })
};
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
            let tweetInfo =`\n`+tweets.statuses[i].text+'\n'+tweets.statuses[i].created_at+'\n';
            append('tweet.txt',tweetInfo);
            console.log(tweets.statuses[i].text + '\n' + tweets.statuses[i].created_at);
            console.log("-----------------");
        }
    });
};
//function to run spotify npm module with node arguments
const music = search => {
    if (search) {
        let params = {type: 'track', query: search, limit: 5};
        console.log(params);
        spotify.search(params, (err, data) => {
            if (err) {
                console.log('error');
                return console.log(err);
            }
            console.log('made it this far');
            console.log("-----------------");
            for (let i = 0; i < data.tracks.items.length; i++) {
                let songInfo =
                    `Song Title: ${data.tracks.items[i].name}\n` +
                    `Artist(s): ${data.tracks.items[i].album.artists[0].name}\n` +
                    `Link to song: ${data.tracks.items[i].external_urls.spotify}\n` +
                    `Album Name: ${data.tracks.items[i].album.name}\n\n`;
                append('music.txt', songInfo);
                console.log(songInfo);
            }
        })
    }
    else {
        let params = {type: 'track', query: "the sign ace of base", limit: 1};
        spotify.search(params, (err, data) => {
            if (err) {
                console.log('error');
                return console.log(err);
            }
            console.log('made it this far');
            console.log("-----------------");
            for (let i = 0; i < data.tracks.items.length; i++) {
                let songInfo =
                    `Song Title: ${data.tracks.items[i].name}\n` +
                    `Artist(s): ${data.tracks.items[i].album.artists[0].name}\n` +
                    `Link to song: ${data.tracks.items[i].external_urls.spotify}\n` +
                    `Album Name: ${data.tracks.items[i].album.name}\n\n`;
                append('music.txt', songInfo);
                console.log(songInfo);
            }
        })
    }
};
//function to run the omdb api using the npm request module
const movie = search => {
    if (search) {
        let queryURL = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&apikey=trilogy';
        request(queryURL, (err, head, body) => {
            if (!err && head.statusCode === 200) {
                let movieInfo =
                    `Title: ${JSON.parse(body).Title}\n` +
                    `Year of Premier: ${JSON.parse(body).Year}\n` +
                    `${JSON.parse(body).Ratings[0].Source} Rating: ${JSON.parse(body).Ratings[0].Value}\n` +
                    `${JSON.parse(body).Ratings[1].Source} Rating: ${JSON.parse(body).Ratings[1].Value}\n` +
                    `Countries of Production: ${JSON.parse(body).Country}\n` +
                    `Original Language of Movie: ${JSON.parse(body).Language}\n` +
                    `Plot of the Movie: ${JSON.parse(body).Plot}\n` +
                    `Actors in the Movie: ${JSON.parse(body).Actors}\n\n`;
                append('movie.txt', movieInfo);
                console.log(movieInfo);
                console.log('--------------------------');
            }
        })
    }
    else {
        let queryURL = 'http://www.omdbapi.com/?t=' + 'Mr. Nobody' + '&y=&plot=short&apikey=trilogy';
        request(queryURL, (err, head, body) => {
            if (!err && head.statusCode === 200) {
                let movieInfo =
                    `Title: ${JSON.parse(body).Title}\n` +
                    `Year of Premier: ${JSON.parse(body).Year}\n` +
                    `${JSON.parse(body).Ratings[0].Source} Rating: ${JSON.parse(body).Ratings[0].Value}\n` +
                    `${JSON.parse(body).Ratings[1].Source} Rating: ${JSON.parse(body).Ratings[1].Value}\n` +
                    `Countries of Production: ${JSON.parse(body).Country}\n` +
                    `Original Language of Movie: ${JSON.parse(body).Language}\n` +
                    `Plot of the Movie: ${JSON.parse(body).Plot}\n` +
                    `Actors in the Movie: ${JSON.parse(body).Actors}\n\n`;
                append('movie.txt', movieInfo);
                console.log(movieInfo);
                console.log('--------------------------');
            }
        })
    }
};
//twitter api call using arguments from node. finds last 20 tweets.
if (api === 'my-tweets') {
    tweet();
}
//    brings back results from spotify api based on node arguments.
else if (api === 'spotify-this-song') {
    music(process.argv[3]);
}
//Using omdb api to bring back information on user supplied movies into the terminal
else if (api === 'movie-this') {
    movie(process.argv[3]);
}
//reads file
else if (api === `do-what-it-says`) {
    fs.readFile(`random.txt`, `utf8`, (err, data) => {
        if (err) {
            return console.log(err);
        }
        let liriCmd = data.split(',');
        let lastApi = liriCmd[0];
        let search = liriCmd[1];
        console.log(lastApi);
        console.log(search);
        if (lastApi === 'my-tweets') {
            tweet();
//    brings back results from spotify api based on node arguments.
        } else if (lastApi === 'spotify-this-song') {
            music(search);
//Using omdb api to bring back information on user supplied movies into the terminal
        } else if (lastApi === 'movie-this') {
            movie(search);

        }
    })
}