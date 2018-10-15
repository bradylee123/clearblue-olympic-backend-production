require('dotenv').config();
var fs = require('fs');
var csv = require('fast-csv');
const pool = require('../databasePool');

pool.connect(function(err) {
    if(err) {
        console.log(err);
    }
});

let csvStream = csv.fromPath("..\\backend\\csv\\athlete_events.csv", { headers: true })
    .on("data", function(record){
        csvStream.pause();

            let id = record.ID;
            let name = record.Name;
            let sex = record.Sex;
            let age = record.Age;
            let height = record.Height;
            let weight = record.Weight;
            let team = record.Team;
            let noc = record.NOC;
            let game = record.Games;
            let year = record.Year;
            let season = record.Season;
            let city = record.City;
            let sport = record.Sport;
            let event_name = record.Event;
            let medal = record.Medal;

            pool.query("INSERT INTO athlete_events(id, name, sex, age, height, weight, team, noc, games, year, season, city, sport, event, medal) \
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)", [id, name, sex, age, height, weight, team, noc, game, year, season, city, sport, event_name, medal], function(err){
                if(err) {
                    console.log(err);
                }
            });

        csvStream.resume();

    }).on("end", function(){
        console.log("Finished loading athlete_events");
    }).on("error", function(err){
        console.log(err);
    });

let csvStream2 = csv.fromPath("..\\backend\\csv\\noc_regions.csv", { headers: true })
    .on("data", function(record){
        csvStream2.pause();

            let noc = record.NOC;
            let region = record.region;
            let notes = record.notes;

            pool.query("INSERT INTO noc_regions(noc, region, notes) \
            VALUES($1, $2, $3)", [noc, region, notes], function(err){
                if(err) {
                    console.log(err);
                }
            });

        csvStream2.resume();

    }).on("end", function(){
        console.log("Finished loading noc_regions");
    }).on("error", function(err){
        console.log(err);
    });
