require("dotenv").config()
const axios = require('axios');
const keys = require("./keys.js");
const inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);



    const options = {
        provider: "ticketmasrter",
        apiKey: "TICKETMASTER_API_KEY"
      };
    var queryUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=1&keyword=" + search + tmKey;
    axios.get(queryUrl).then(
        function (response){
            
            console.log("Event Name: " + response.data._embedded.events[0].name);
            console.log("Venue: " + response.data._embedded.events[0]._embedded.venues[0].name)
            console.log("Venue City: " + response.data._embedded.events[0]._embedded.venues[0].city.name)
            console.log("Start Time: " + response.data._embedded.events[0].dates.start.localTime)
        })
            .catch(function (error) {
                console.log(error);
    });
console.log(options);
   

 