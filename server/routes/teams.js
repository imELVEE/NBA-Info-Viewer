var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/id/:ID', function(req, res, next) {
  fetch(`https://api.balldontlie.io/v1/players?per_page=100&team_ids[]=${req.params.ID}`, {
    method: 'GET',
    headers: {
      'Authorization': '5326c7ba-58bf-4654-964e-9bccd369dd9f'
    },
  })
    .then(res => res.json())
    .then(data => res.send(data));
});

module.exports = router;
