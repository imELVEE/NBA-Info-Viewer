import React, {useState, useEffect, useContext} from "react";
import {SearchContext} from "../FlowController";

const SearchResults = () => {
	const [isLoadingPlayers, setIsLoadingPlayers] = useState(true);
	const [isLoadingTeams, setIsLoadingTeams] = useState(true);
	const [playersData, setPlayersData] = useState(undefined);
	const [teamsData, setTeamsData] = useState(undefined);
	const [serverStatus, setServerStatus] = useState('Down');

	const SearchContent = useContext(SearchContext);
	const query = SearchContent.searching;
	
	useEffect(() => {
		fetch('http://localhost:5000/search/players/'+query)
			.then((response) => {
				if (response.ok) {
					setServerStatus('Up');
					console.log('SERVER IS UP')
					return response.text();
				}
				else{
					setServerStatus('Down');
					return Promise.reject(response);
				}
			})
			.then((data) => {setPlayersData(data);})
			.catch((response) => {console.log('SERVER MAY BE DOWN');})
			.finally(() => {setIsLoadingPlayers(false);})

		fetch('http://localhost:5000/search/teams/'+query)
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
			.then((data) => {setTeamsData(data);})
			.catch((response) => {console.log('SERVER MAY BE DOWN');})
			.finally(() => {setIsLoadingTeams(false);})
	}, [query])
	
	if (serverStatus === 'Down')
	{
		return (
			<div> Server Down </div>
		);
	}

	if (isLoadingPlayers && isLoadingTeams)
	{
		return (
			<div>
				<div>Of Search '{query}' </div>
				<h1>
				PLAYERS THAT MATCHED
				</h1>
				Loading Request From Server
				<h1>
				TEAMS THAT MATCHED
				</h1>
				Loading Request From Server
	      	</div>
		);
	}

	return (
		<div>
			<div>Of Search '{query}' </div>
			<h1>
			PLAYERS THAT MATCHED
			</h1>
			{JSON.stringify(playersData)}
			<h1>
			TEAMS THAT MATCHED
			</h1>
			{JSON.stringify(teamsData)}
      	</div>
	);
}

export default SearchResults;