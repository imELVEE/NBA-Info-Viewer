const API_KEY = process.env.NBA_RAPIDKEY;

var express = require('express');
var router = express.Router();

router.get('/teams/:TEAMSARRAY', async function(req, res, next) {
  
  let teams_ids_array = req.params.TEAMSARRAY.split(',').map(Number);
  let teams_data = await getTeams(teams_ids_array);
  let fetched_data = {
    'teams': teams_data,
  }
  console.log(JSON.stringify(fetched_data));
  res.send(fetched_data);
})

router.get('/players/:PLAYERSARRAY', async function(req, res, next) {
  
  let players_ids_array = req.params.PLAYERSARRAY.split(',').map(Number);
  let players_data = await getPlayers(players_ids_array)
  let fetched_data = {
    'players': players_data
  }
  console.log(JSON.stringify(fetched_data));
  res.send(fetched_data);
})

 async function getTeam(id) {
  let team_data = undefined;
  let response = await fetch(`https://api-nba-v1.p.rapidapi.com/teams?id=${id}`, {
                          method: 'GET',
                          headers: {
                            'X-RapidAPI-Key': `${API_KEY}`,
                            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
                          },
                        });
  let data = await response.json();
  team_data = data['response'][0];
  if (team_data)
  {
    return team_data;
  }
}

async function getTeams(id_array) {
  var teams_data = [];
  for (const id of id_array)
  {
    teams_data.push(await getTeam(id));
  }
  return teams_data;
}

async function getPlayer(id) {
  let player_data = undefined;
  let response = await fetch(`https://api-nba-v1.p.rapidapi.com/players?id=${id}`, {
                          method: 'GET',
                          headers: {
                            'X-RapidAPI-Key': `${API_KEY}`,
                            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
                          },
                        });
  let data = await response.json();
  player_data = data['response'][0];
  if (player_data)
  {
    return player_data;
  }
}

async function getPlayers(id_array) {
  var players_data = [];
  for (const id of id_array)
  {
    players_data.push(await getPlayer(id));
  }
  return players_data;
}

module.exports = router;
