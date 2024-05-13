const API_KEY = process.env.NBA_RAPIDKEY;

var express = require('express');
var router = express.Router();

//date method from stack overflow: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
var utc = new Date().toJSON().slice(0,10);

/* GET home page. */
router.get('/live', function(req, res, next) {
  fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${utc}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${API_KEY}`,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    },
  })
    .then(res => res.json())
    .then(data => res.send(data));
});

module.exports = router;
