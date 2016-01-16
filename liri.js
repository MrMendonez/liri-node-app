var fs = require("fs");
var twitterKeys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('spotify');
var songName;
var request = require('request');
var params = process.argv.slice(2);

switch(params[0]) {

  case "tweet":
  case "tweets":
  case "twitter":
  case "my-tweets":
    twitterCall(params[1]);
    break;

  case "song":
  case "music":
  case "spotify":
  case "spotify-this-song":
    if(params[1]) {
      spotifyCall(params[1]);
    } 
    else {
      spotifyCall("What\'s my age again?");
    }
    break;

  case "movie":
  case "movie-this":
    if(params[1]) {
      movieCall(params[1]);
    }
    else {
      movieCall("Ex Machina");
    }
    break;

  case "do":
  case "do-what-it-says":
    saysCall(params[1]);
    break;

  default:
    console.log("Invalid input. Please try again.");

}

function twitterCall() {
  var client = new twitter({
    consumer_key: twitterKeys.twitterKeys.consumer_key,
    consumer_secret: twitterKeys.twitterKeys.consumer_secret,
    access_token_key:  twitterKeys.twitterKeys.access_token_key,
    access_token_secret: twitterKeys.twitterKeys.access_token_secret   
  });
  params = {screen_name: 'MrMendonez'};
  client.get('statuses/user_timeline', params, function(error, data, response){
    for(var i = 0; i < data.length; i++) {
      var twitterResults = "@" + data[i].user.screen_name + ": " + 
        data[i].text + "\r\n" + 
        data[i].created_at + "\r\n" + 
        "------- End Tweet -------" + "\r\n";
      console.log(twitterResults); 
    }
  });
};

function spotifyCall() {
  songName = params[1];
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
      console.log('Error occurred: ' + err);
      return;
    }
    var albumInfo = data.tracks.items[0];
    console.log("Artist: " + albumInfo.artists[0].name + "\r\n" +
      "Track Name: " + albumInfo.name + "\r\n" +
      "Album: " + albumInfo.album.name + "\r\n" +
      "Preview Link: " + albumInfo.preview_url + "\r\n");
  });
}