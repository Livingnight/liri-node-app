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
const api = process.argv[2];

//parameters for twitter api
let params = {
    q: 'dragnosfall',
    count: 20,
    lang: 'en'
};
const tweet = () => {
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
const music = () => {
    const search = process.argv[3];
    if (search) {
        let params = {type: 'track', query: search, limit: 5};
        console.log(params);
        // console.log(movie);
        spotify.search(params, (err, data) => {
            if (err) {
                console.log('error');
                return console.log(err);
            }
            console.log('made it this far');
            console.log("-----------------");
            for (let i = 0; i < data.tracks.items.length; i++) {

                //    The song name
                console.log(`Song Title: ` + data.tracks.items[i].name);

                //    The artist's name
                console.log(`Artist(s): ` + data.tracks.items[i].album.artists[0].name);

                //    A preview link of the song from spotify
                console.log(`Link to song: ` + data.tracks.items[i].external_urls.spotify);

                //    The album that the song is from
                console.log(`Album Name: ` + data.tracks.items[i].album.name);
                console.log("-----------------");
            }
        })
    } else {
        let params = {type: 'track', query: 'This Way ace of base'};
        console.log(params);
        spotify.search(params, (err, data) => {
            if (err) {
                console.log('error');
                return console.log(err);
            }
            console.log('made it this far');
            console.log("-----------------");
            for (let i = 0; i < data.tracks.items.length; i++) {

                //    The song name
                console.log(`Song Title: ` + data.tracks.items[i].name);

                //     console.log(data.tracks.items.album);
                //    The artist's name
                console.log(`Artist(s): ` + data.tracks.items[i].album.artists[0].name);

                //    A preview link of the song from spotify
                console.log(`Link to song: ` + data.tracks.items[i].external_urls.spotify);

                //    The album that the song is from
                console.log(`Album Name: ` + data.tracks.items[i].album.name);
                console.log("-----------------");
            }
        })
    }
}
const movie = () => {
    let movie = process.argv[3];
    if (movie) {
        let queryURL = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy';
        request(queryURL, (err, head, body) => {
            if (!err && head.statusCode === 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

                //Title of move
                console.log(`Title: ` + JSON.parse(body).Title);
                //Year the movie came out
                console.log("Year of Premier: " + JSON.parse(body).Year);
                //IMDB rating of the movie
                console.log(JSON.parse(body).Ratings[0].Source +" Rating: " + JSON.parse(body).Ratings[0].Value);
                //Rotten Tomatoes rating of movie
                console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
                //Country where move was produced
                console.log("Countries of Production: " + JSON.parse(body).Country);
                //Language of the movie
                console.log("Original Language of Movie: " + JSON.parse(body).Language);
                //Plot of the movie
                console.log("Plot of the Movie: " + JSON.parse(body).Plot);
                //Actors in the movie
                console.log("Actors in the Movie: " + JSON.parse(body).Actors);
                console.log('--------------------------');
            }
        })
    }else {
        let queryURL = 'http://www.omdbapi.com/?t=' + 'Mr. Nobody' + '&y=&plot=short&apikey=trilogy';
        request(queryURL, (err, head, body) => {
            if (!err && head.statusCode === 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

                //Title of move
                console.log(`Title: ` + JSON.parse(body).Title);
                //Year the movie came out
                console.log("Year of Premier: " + JSON.parse(body).Year);
                //IMDB rating of the movie
                console.log(JSON.parse(body).Ratings[0].Source +" Rating: " + JSON.parse(body).Ratings[0].Value);
                //Rotten Tomatoes rating of movie
                console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
                //Country where move was produced
                console.log("Countries of Production: " + JSON.parse(body).Country);
                //Language of the movie
                console.log("Original Language of Movie: " + JSON.parse(body).Language);
                //Plot of the movie
                console.log("Plot of the Movie: " + JSON.parse(body).Plot);
                //Actors in the movie
                console.log("Actors in the Movie: " + JSON.parse(body).Actors);
                console.log('--------------------------');

            }
        })
    }
}
//twitter api call using arguments from node. finds last 20 tweets.
if (api === 'my-tweets') {
    tweet();
//    brings back results from spotify api based on node arguments.
} else if (api === 'spotify-this-song') {
    music();
//Using omdb api to bring back information on user supplied movies into the terminal
} else if (api === 'movie-this'){
    movie();
} else if(api === `do-what-it-says`){
    fs.readFile(`random.txt`, `utf8`, (err, data)=>{
        if(err){
            return console.log(err);
        }
        let liriCmd = data.split(',');
        let lastApi = liriCmd[0];
        let search = liriCmd[1];
        // console.log(lastApi);
        // console.log(search);
        if (lastApi === 'my-tweets') {
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
//    brings back results from spotify api based on node arguments.
        } else if (lastApi === 'spotify-this-song') {
            // let search = process.argv[3];
            if (search) {
                let params = {type: 'track', query: search, limit: 5};
                console.log(params);
                // console.log(movie);
                spotify.search(params, (err, data) => {
                    if (err) {
                        console.log('error');
                        return console.log(err);
                    }
                    console.log('made it this far');
                    console.log("-----------------");
                    for (let i = 0; i < data.tracks.items.length; i++) {

                        //    The song name
                        console.log(`Song Title: ` + data.tracks.items[i].name);

                        //     console.log(data.tracks.items.album);
                        //    The artist's name
                        console.log(`Artist(s): ` + data.tracks.items[i].album.artists[0].name);

                        //    A preview link of the song from spotify
                        console.log(`Link to song: ` + data.tracks.items[i].external_urls.spotify);

                        //    The album that the song is from
                        console.log(`Album Name: ` + data.tracks.items[i].album.name);
                        console.log("-----------------");
                    }
                })
            } else {
                let param = {type: 'track', query: 'This Way', limit: 5};
                console.log(params);
                spotify.search(param, (err, data) => {
                    if (err) {
                        console.log('error');
                        return console.log(err);
                    }
                    console.log('made it this far');
                    console.log("-----------------");
                    for (let i = 0; i < data.tracks.items.length; i++) {

                        //    The song name
                        console.log(`Song Title: ` + data.tracks.items[i].name);

                        //     console.log(data.tracks.items.album);
                        //    The artist's name
                        console.log(`Artist(s): ` + data.tracks.items[i].album.artists[0].name);

                        //    A preview link of the song from spotify
                        console.log(`Link to song: ` + data.tracks.items[i].external_urls.spotify);

                        //    The album that the song is from
                        console.log(`Album Name: ` + data.tracks.items[i].album.name);
                        console.log("-----------------");
                    }
                })
            }
//Using omdb api to bring back information on user supplied movies into the terminal
        } else if (lastApi === 'movie-this') {
            // let movie = process.argv[3];
            if (search) {
                let queryURL = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&apikey=trilogy';
                request(queryURL, (err, head, body) => {
                    if (!err && head.statusCode === 200) {

                        // Parse the body of the site and recover just the imdbRating
                        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

                        //Title of move
                        console.log(`Title: ` + JSON.parse(body).Title);
                        //Year the movie came out
                        console.log("Year of Premier: " + JSON.parse(body).Year);
                        //IMDB rating of the movie
                        console.log(JSON.parse(body).Ratings[0].Source +" Rating: " + JSON.parse(body).Ratings[0].Value);
                        //Rotten Tomatoes rating of movie
                        console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
                        //Country where move was produced
                        console.log("Countries of Production: " + JSON.parse(body).Country);
                        //Language of the movie
                        console.log("Original Language of Movie: " + JSON.parse(body).Language);
                        //Plot of the movie
                        console.log("Plot of the Movie: " + JSON.parse(body).Plot);
                        //Actors in the movie
                        console.log("Actors in the Movie: " + JSON.parse(body).Actors);
                        console.log('--------------------------');
                    }
                })
            }else {
                let queryURL = 'http://www.omdbapi.com/?t=' + 'Mr. Nobody' + '&y=&plot=short&apikey=trilogy';
                request(queryURL, (err, head, body) => {
                    if (!err && head.statusCode === 200) {

                        // Parse the body of the site and recover just the imdbRating
                        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

                        //Title of move
                        console.log(`Title: ` + JSON.parse(body).Title);
                        //Year the movie came out
                        console.log("Year of Premier: " + JSON.parse(body).Year);
                        //IMDB rating of the movie
                        console.log(JSON.parse(body).Ratings[0].Source +" Rating: " + JSON.parse(body).Ratings[0].Value);
                        //Rotten Tomatoes rating of movie
                        console.log(JSON.parse(body).Ratings[1].Source + " Rating: " + JSON.parse(body).Ratings[1].Value);
                        //Country where move was produced
                        console.log("Countries of Production: " + JSON.parse(body).Country);
                        //Language of the movie
                        console.log("Original Language of Movie: " + JSON.parse(body).Language);
                        //Plot of the movie
                        console.log("Plot of the Movie: " + JSON.parse(body).Plot);
                        //Actors in the movie
                        console.log("Actors in the Movie: " + JSON.parse(body).Actors);
                        console.log('--------------------------');

                    }
                })
            }






        }


    })
}