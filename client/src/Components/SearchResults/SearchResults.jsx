import React, {useState, useEffect, useContext, createContext} from "react";
import {combinedSearchStatsContext} from "../FlowController";
import MiniTeam from "../Blurbs/MiniTeam/MiniTeam";
import MiniPlayer from "../Blurbs/MiniPlayer/MiniPlayer";
import BlurbsContainer from  "../Blurbs/BlurbsContainer";
import greyed_out from "../../assets/greyed_out.png";

const SearchResults = ({userData, setUserData}) => {
	const [isLoadingPlayers, setIsLoadingPlayers] = useState(true);
	const [isLoadingTeams, setIsLoadingTeams] = useState(true);
	const [playersData, setPlayersData] = useState(undefined);
	const [teamsData, setTeamsData] = useState(undefined);
	const [serverStatus, setServerStatus] = useState('Down');

	const CombinedContent = useContext(combinedSearchStatsContext);
	const query = CombinedContent.searching;
	
	//console.log(`search results: ${JSON.stringify(userData)}`);

	useEffect(() => {
		fetch('http://localhost:5000/search/players/'+query)
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
			.then((data) => {setPlayersData(data);})
			.catch((response) => {console.log('SERVER MAY BE DOWN');})
			.finally(() => {setIsLoadingPlayers(false);})

		fetch('http://localhost:5000/search/teams/'+query)
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
			.then((data) => {setTeamsData(data);})
			.catch((response) => {console.log('SERVER MAY BE DOWN');})
			.finally(() => {setIsLoadingTeams(false);})
	}, [query])

	if (serverStatus === 'Down' && !isLoadingTeams && !isLoadingPlayers)
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

	if (isLoadingPlayers || isLoadingTeams)
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

	if (playersData && teamsData)
	{
		combinedSearchStatsContext.searching = undefined;
		return (
			<div>
				<div>Of Search '{query}' </div>
				<h1>
				PLAYERS THAT MATCHED
				</h1>
				<BlurbsContainer>
				{playersData["response"].map((player) => (<MiniPlayer key={player.id} id={player.id} firstName={player.firstname} lastName={player.lastname} picture={greyed_out} userData={userData} setUserData={setUserData}/>))}
				</BlurbsContainer>
				<h1>
				TEAMS THAT MATCHED
				</h1>
				<BlurbsContainer>
				{teamsData["response"].map((team) => (<MiniTeam key={team.id} id={team.id} name={team.name} logo={team.logo} userData={userData} setUserData={setUserData}/>))}
				</BlurbsContainer>
	      	</div>
		);
	}
}

export default SearchResults;