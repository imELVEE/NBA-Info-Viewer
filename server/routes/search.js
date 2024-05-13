require("dotenv").config();

const API_KEY = process.env.NBA_RAPIDKEY;

var express = require('express');
var router = express.Router();

router.get('/players/:STRING', function(req, res, next) {
  fetch(`https://api-nba-v1.p.rapidapi.com/players?search=${req.params.STRING}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${API_KEY}`,
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    },
  })
    .then(res => res.json())
    .then(data => res.send(data));
});

router.get('/teams/:STRING', function(req, res, next) {
  fetch(`https://api-nba-v1.p.rapidapi.com/teams?search=${req.params.STRING}`, {
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
