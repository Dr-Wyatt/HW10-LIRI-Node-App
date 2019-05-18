require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
// var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv[3]





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

