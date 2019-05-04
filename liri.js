require("dotenv").config()
const axios = require('axios');
const keys = require("./keys.js");
const inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);