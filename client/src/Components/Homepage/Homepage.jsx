import React, {useEffect, useState} from "react";
import Feature from "./FeaturedBanner/Feature";
import Watchlist from './Watchlist/Watchlist';

const Homepage = ({userData, setUserData}) => {
	const [gamesData, setGamesData] = useState(undefined);
	const [isLoadingGames, setIsLoadingGames] = useState(true);
	const [serverStatus, setServerStatus] = useState('Down');

	useEffect(() => {
		fetch('http://localhost:5000/games/live')
			.then((response) => {
				if (response.ok) {
					setServerStatus('Up');
					//console.log('SERVER IS UP')
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

	if (serverStatus === 'Down' && !isLoadingGames)
	{
		return (
				<div> Server Down </div>
		);
	}

	if (serverStatus === 'Down')
	{
		return (
				<div> LOADING </div>
		);
	}

	if (isLoadingGames)
	{
		return (
			<div>
				<div>Loading Games</div>
				<Watchlist data={userData} setData={setUserData}/>
			</div>
		);
	}

	if (gamesData && gamesData['response'].length === 0)
	{
		return(
			<div>
				<div>
					<h1>
					Games Today
					</h1>
					No games scheduled today (UTC).
				</div>
				<div>
					<Watchlist data={userData} setData={setUserData}/>
				</div>
			</div>
		);
	}

	if (gamesData)
	{
		//console.log(gamesData);
		return (
			<div>
				<div>
					<h1>
					Games Today
					</h1>
					{Object.entries(gamesData["response"]).map((game) => (<Feature key={game[1].id} status={game[1].status.long} home_team={game[1].teams.home.name} away_team={game[1].teams.visitors.name} home_score={game[1].scores.home.points} away_score={game[1].scores.visitors.points}/>))}
				</div>
				<div>
					<Watchlist data={userData} setData={setUserData}/>
				</div>
			</div>
		);
	}
}

export default Homepage;