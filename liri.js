require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var date;
var newMoment;
var spotify = new Spotify(keys.spotify);
console.log(spotify);
var command = process.argv[2];
var input = process.argv[3]

spotify.search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

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

if (command == "concert-this" && input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log(response.data[0]);
            for (var i = 0; i < response.data.length; i++) {
                date = response.data[i].datetime;
                newMoment = moment(date);
                if(!response.data[i].venue.region){
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

