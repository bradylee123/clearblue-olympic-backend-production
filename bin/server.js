require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.SERVER_PORT || 5000;

const goldMedalRouter = require('../api/gold_medal');
const silverMedalRouter = require('../api/silver_medal');
const bronzeMedalRouter = require('../api/bronze_medal');
const topSportRouter = require('../api/top_sport');
const allSportsMedalRouter = require('../api/all_sports_medal');
const topAthleteRouter = require('../api/top_athlete');
const bestCountryRouter = require('../api/best_country');
const ageDistributionRouter = require('../api/age_distribution');
const dataRouter = require('../api/data');
const teamRouter = require('../api/team');

const app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/goldMedal', goldMedalRouter);
app.use('/silverMedal', silverMedalRouter);
app.use('/bronzeMedal', bronzeMedalRouter);
app.use('/topSport', topSportRouter);
app.use('/allSportsMedal', allSportsMedalRouter);
app.use('/topAthlete', topAthleteRouter);
app.use('/bestCountry', bestCountryRouter);
app.use('/ageDistribution', ageDistributionRouter);
app.use('/data', dataRouter);
app.use('/team', teamRouter);

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
