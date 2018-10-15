const { Router } = require('express');
const AthleteEventsTable = require('../sql/table');
const router = new Router();

router.get('/', (req, res) => {
  AthleteEventsTable.getBestCountryQuery({
    season: req.query.season,
    sex: req.query.sex
  })
    .then((response) => {
      res.send(response.rows);
    }) .catch(err => {
      console.error('error', err)}
    );
});

module.exports = router;
