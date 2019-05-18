require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var date;
var newMoment;
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv[3]

function runChecker(command, input) {
    spotifyFunc(command, input);
    movieFunc(command, input);
    bandFunc(command, input);
}

function spotifyFunc(command, input) {
    if (command == "spotify-this-song" && input) {
        spotify.search({ type: 'track', query: input, limit: 1 })
            .then(function (response) {
                console.log(`
    Artist Name: ${response.tracks.items[0].album.artists[0].name}
    Album Name: ${response.tracks.items[0].album.name}
    Song Name: ${response.tracks.items[0].name}
    Preview: ${response.tracks.items[0].preview_url}`)
            })
            .catch(function (err) {
                console.log(err);
            });
    } else if (command == "spotify-this-song" && !input) {
        spotify.search({ type: 'track', query: 'The Sign' })
            .then(function (response) {
                console.log(`
    Artist Name: ${response.tracks.items[7].album.artists[0].name}
    Album Name: ${response.tracks.items[7].album.name}
    Song Name: ${response.tracks.items[7].name}
    Preview: ${response.tracks.items[7].preview_url}`)
            }).catch(function (err) {
                console.log(err);
            });
    }
}


function movieFunc(command, input) {
    if (command == "movie-this" && input) {
        axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log(`
    Title: ${response.data.Title}
    Year: ${response.data.Year}
    IMDB Rating: ${response.data.imdbRating}
    Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
    Country of Release: ${response.data.Country}
    Language of Movie: ${response.data.Language}
    Plot: ${response.data.Plot}
    Actors: ${response.data.Actors}`);
            }
        );
    } else if (command == "movie-this" && !input) {
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log(`
    Title: ${response.data.Title}
    Year: ${response.data.Year}
    IMDB Rating: ${response.data.imdbRating}
    Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
    Country of Release: ${response.data.Country}
    Language of Movie: ${response.data.Language}
    Plot: ${response.data.Plot}
    Actors: ${response.data.Actors}`);
            }
        );
    }
}

function bandFunc() {
    console.log("command: ", command);
    console.log("input: ", input)
    if (command == "concert-this" && input) {
        axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
            function (response) {
                console.log(response.data[0]);
                for (var i = 0; i < response.data.length; i++) {
                    date = response.data[i].datetime;
                    newMoment = moment(date);
                    if (!response.data[i].venue.region) {
                        console.log(`
    Venue: ${response.data[i].venue.name}
    Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}
    Date: ${newMoment.format("MMM Do YYYY")}`);
                    } else {
                        console.log(`
    Venue: ${response.data[i].venue.name}
    Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}
    Date: ${newMoment.format("MMM Do YYYY")}`);
                    }
                }
            }
        )
    }
}

if (command == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",")
        console.log(dataArr);
        command = dataArr[0];
        input = dataArr[1].replace(/"/g, "");;
        console.log("Command: ", command);
        console.log("Input: ", input);
        runChecker(command, input);


    });
}
runChecker(command, input);