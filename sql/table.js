const pool = require('../databasePool');

class AthleteEventsTable {
  static getDataQuery({season, team, sex}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM athlete_events WHERE "season" = $1 AND "team" = $2 AND "sex" = $3',
        [season, team, sex],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

  static getGoldMedalQuery({season, team, sex}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT year, COUNT(medal) AS num FROM athlete_events WHERE "season" = $1 AND "team" = $2 AND "sex" = $3 AND medal = $4 GROUP BY year ORDER BY year ASC',
        [season, team, sex, 'Gold'],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

  static getSilverMedalQuery({season, team, sex}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT year, COUNT(medal) AS num FROM athlete_events WHERE "season" = $1 AND "team" = $2 AND "sex" = $3 AND medal = $4 GROUP BY year ORDER BY year ASC',
        [season, team, sex, 'Silver'],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

  static getBronzeMedalQuery({season, team, sex}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT year, COUNT(medal) AS num FROM athlete_events WHERE "season" = $1 AND "team" = $2 AND "sex" = $3 AND medal = $4 GROUP BY year ORDER BY year ASC',
        [season, team, sex, 'Bronze'],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

  static getTopSportQuery({season, team, sex}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT t3.sport, COUNT(t3.medal) AS num FROM athlete_events t3 WHERE t3.season = $1 AND t3.team = $2 AND t3.sex = $3 AND t3.medal <> $4 GROUP BY t3.sport HAVING COUNT(t3.medal) = ( SELECT MAX(t2.num) FROM ( SELECT t1.sport, COUNT(t1.medal) AS num FROM athlete_events t1 WHERE t1.season = $1 AND t1.team = $2 AND t1.sex = $3 AND t1.medal <> $4 GROUP BY t1.sport ) AS t2 )',
        [season, team, sex, 'NA'],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

  static getAllSportsMedalQuery({season, team, sex}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT COUNT(medal) AS num FROM athlete_events WHERE season = $1 AND team = $2 AND sex = $3 AND medal <> $4',
        [season, team, sex, 'NA'],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

  static getTopAthleteQuery({season, team, sex}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT t3.name, COUNT(t3.medal) AS num FROM athlete_events t3 WHERE t3.season = $1 AND t3.team = $2 AND t3.sex = $3 AND t3.medal <> $4 GROUP BY t3.name HAVING COUNT(t3.medal) = ( SELECT MAX(t2.num) FROM ( SELECT t1.name, COUNT(t1.medal) AS num FROM athlete_events t1 WHERE t1.season = $1 AND t1.team = $2 AND t1.sex = $3 AND t1.medal <> $4 GROUP BY t1.name ) AS t2 )',
        [season, team, sex, 'NA'],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

  static getBestCountryQuery({season, sex}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT nr.region AS country, ae.medals AS num FROM ( SELECT t3.noc AS code, COUNT(t3.medal) AS medals FROM athlete_events t3 WHERE t3.season = $1 AND t3.sex = $2 AND t3.medal <> $3 GROUP BY t3.noc HAVING COUNT(t3.medal) = ( SELECT MAX(t2.num) FROM ( SELECT t1.noc, COUNT(t1.medal) AS num FROM athlete_events t1 WHERE t1.season = $1 AND t1.sex = $2 AND t1.medal <> $3 GROUP BY t1.noc ) AS t2 )) AS ae INNER JOIN noc_regions AS nr ON ae.code = nr.noc',
        [season, sex, 'NA'],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

  static getAgeQuery({season, team, sex}) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT age, COUNT(*) AS num FROM ( SELECT DISTINCT(id), age FROM athlete_events WHERE "season" = $1 AND "team" = $2 AND "sex" = $3 ) AS t1 GROUP BY age ORDER BY age ASC',
        [season, team, sex],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

  static getTeamQuery() {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT DISTINCT(team) from athlete_events ORDER BY team ASC;',
        [],
        (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        }
      )
    });
  }

}

module.exports = AthleteEventsTable;
