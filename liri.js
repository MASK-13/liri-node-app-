//  Data from keys.js
require("dotenv").config();
var keys = require('./keys.js');
var fs = require("fs");
var request = require('request');
var spotify = require('spotify');
var Twitter = require ('twitter');

//.. keys from keys.js //
 var keyList = new Twitter(keys.twitterKeys);
//..   // 
 var action = process.argv[2];
 console.log(action);
//
var parameter = process.argv[3];

//... if... ..//


command();

log();



//SWITCH STATEMENT FUNCTION RUNS 

function command (){



    switch (action){

        case "my-tweets":

            tweet();

            break;



        case "spotify-this-song":

            thisSpotify();

            break;



        case "movie-this":

            movie();

            break;



        case "do-what-it-says":

            justDoIt();

            break;

    }

}



//TWEETS

function tweet(){

    // SCREEN NAME 

    var params = {screen_name: 'MASK_13_'};

    keyList.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {

        // FOR LOOP TWEET and tie created 

            for (var i = 0; i < tweets.length; i++) {

                console.log(tweets[i].created_at + ": " + tweets[i].text);

            }

        }  

    });

}



// SPOTIFY FUNCT

function thisSpotify() {

    //A



    

    if (parameter === ""){

        parameter = "The sign by ace of base";
    } else{

    }


    spotify.search({ type: 'track', query: parameter }, function(err, data) {

        if ( err ) {

            console.log('Error occurred: ' + err);

            return;

        }

        else if (!err){

            console.log(data.tracks.items[0].artists[0].name);

            console.log(data.tracks.items[0].name);

            console.log(data.tracks.items[0].preview_url);

            console.log(data.tracks.items[0].album.name); 

        }



    });

}



//..function movie 

function movie() {

    //

    if (parameter === ""){

        parameter = "Mr. Nobody";

        console.log("blank input");

    } else{

        console.log("Song entered");

    }



    // OMDB API w

    var queryUrl = "http://www.omdbapi.com/?t=" + parameter + "&y=&plot=full&tomatoes=true&r=json";

    request(queryUrl, function(error, response, body) {



        // If the request is successful

        if (!error && response.statusCode === 200) {

            //..
            console.log("Title: " + JSON.parse(body).Title);

            console.log("Release Year: " + JSON.parse(body).Year);

            console.log("IMBD Rating: " + JSON.parse(body).imdbRating);

            console.log("Production Country: " + JSON.parse(body).Country);

            console.log("Language: " + JSON.parse(body).Language);

            console.log("Plot: " + JSON.parse(body).Plot);

            console.log("Actors: " + JSON.parse(body).Actors);

            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoUserRating);

            console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);

            }

        });

}



// just doit

function justDoIt() {



    // random.txt file.

    // VAR data

    fs.readFile("random.txt", "utf8", function(error, data) {



        //... commas

        var dataArr = data.split(",");

        console.log(dataArr);



        var randomCommand = dataArr[0];

        parameter = dataArr[1];

        

        switch (randomCommand){

            case "my-tweets":

                tweet();

                break;



            case "spotify-this-song":

                thisSpotify();

                break;



            case "movie-this":

                movie();

                break;



            case "do-what-it-says":

                justDoIt();

                break;

        }



    });



}





function log() {

    

    action = "Log Action: " + action + "\n";



    fs.appendFile('log.txt', action, function(err) {



      if (err) {

     console.log(err);

      }

      else {

    console.log("Content Added!");

      }



    });



}