import React, {useEffect, useState} from "react";
import Feature from "./FeaturedBanner/Feature";
import Watchlist from './Watchlist/Watchlist';

const Homepage = (data) => {
	const [gamesData, setGamesData] = useState(undefined);
	const [isLoadingGames, setIsLoadingGames] = useState(true);
	const [serverStatus, setServerStatus] = useState('Down');

	console.log(`from homepage: ${JSON.stringify(data)}`)

	useEffect(() => {
		fetch('http://localhost:5000/games/live')
			.then((response) => {
				if (response.ok) {
					setServerStatus('Up');
					console.log('SERVER IS UP')
					return response.json();
				}
				else{
					setServerStatus('Down');
					return Promise.reject(response);
				}
			})
			.then((data) => {setGamesData(data);})
			.catch((response) => {console.log('SERVER MAY BE DOWN');})
			.finally(() => {setIsLoadingGames(false);})
	}, [])

	if (serverStatus === 'Down')
	{
		return (
				<div> Server Down </div>
		);
	}

	if (isLoadingGames)
	{
		return (
			<div>
				<div>Loading Games</div>
				<Watchlist data={data}/>
			</div>
		);
	}

	if (gamesData)
	{
		//console.log(gamesData);
		return (
			<div>
				<div>
					{Object.entries(gamesData["response"]).map((game) => (<Feature key={game[1].id} status={game[1].status.long} home_team={game[1].teams.home.name} away_team={game[1].teams.visitors.name} home_score={game[1].scores.home.points} away_score={game[1].scores.visitors.points}/>))}
				</div>
				<div>
					<Watchlist data={data}/>
				</div>
			</div>
		);
	}
}

export default Homepage;