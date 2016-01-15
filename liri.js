var twitter = require("./keys.js");
var fs = require('fs'); //reads and writes files

fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(',');

    console.log(dataArr);

});

var params = process.argv.slice(3);
var result;

switch(process.argv[2]) {
  case "my-tweets":
    result = twitter(params);
    break;

  case "spotify-this-song":
    result = subtract.doIt(params);
    break;

  case "movie-this":
    result = product(params);
    break;

  case "do-what-it-says":
    result = quotient(params);
    break;

  default:
    result = subtract.dontDoIt();
}
console.log(result);