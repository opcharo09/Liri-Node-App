require("dotenv").config();
const inquirer = require("inquirer");
const axios = require('axios');
const keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
// liri commands
    inquirer
    .prompt([
        {
            type: "list",
            message: "search for a music, movie, or event?",
            choices: ["events", "music", "movies"],
            name: "type"
        },
        {
            type: "search",
            message: "What exactly are you searching for?",
            name: "search"
        }
    ])
    .then(function (response) {
        if (response.type === "Movies"){
            omdb(response.search)
        } else if (response.type === "Events"){
            tm(response.search)
        } else music(response.search)
    });
    
 // ombd movie fuction  
    function omdb(search){
        axios.get("http://www.omdbapi.com/?t=" + search + OMBD_ID ).then(
            function (response){
                
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        )
    }

// ticketmaster api fuction
    function tm(search){
    axios.get("https://app.ticketmaster.com/discovery/v2/events.json?size=1&keyword=" + search + TM_ID).then(
        function (response){
            
            console.log("Event Name: " + response.data._embedded.events[0].name);
            console.log("Venue: " + response.data._embedded.events[0]._embedded.venues[0].name)
            console.log("Venue City: " + response.data._embedded.events[0]._embedded.venues[0].city.name)
            console.log("Start Time: " + response.data._embedded.events[0].dates.start.localTime)
        })
            .catch(function (error) {
                console.log(error);
    });

// spotify fuction
    function music(search){
        spotify.search({ type: 'track', query: search, limit: 1 }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
        
        console.log("Artist: " + data.tracks.items[0].artists[0].name); 
        console.log("song Name: " + data.tracks.items[0].songname);
        console.log("Preview Link: " + data.tracks.items[0].preview_url); 
        console.log("Album: " + data.tracks.items[0].album.name); 
        
      });
    }
 }
