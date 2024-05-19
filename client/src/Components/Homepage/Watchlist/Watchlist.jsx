import React, {useEffect, useState} from 'react';
import BlurbsContainer from '../../Blurbs/BlurbsContainer';
import MiniTeam from "../../Blurbs/MiniTeam/MiniTeam";
import MiniPlayer from "../../Blurbs/MiniPlayer/MiniPlayer";
import greyed_out from "../../../assets/greyed_out.png";

const Watchlist = (data) => {
	const [isLoadingPlayers, setIsLoadingPlayers] = useState(true);
	const [isLoadingTeams, setIsLoadingTeams] = useState(true);
	const [playersData, setPlayersData] = useState(undefined);
	const [teamsData, setTeamsData] = useState(undefined);

	var db_data = undefined;
	if (data)
	{
		db_data = data['data']['data'];
	}

	useEffect(() => {
		if (db_data)
		{
			fetch(`http://localhost:5000/get/teams/${db_data['teams']}`)
			.then((response) => {return response.json();})
			.then((server_data) => {if (server_data['teams'])
									{
										setIsLoadingTeams(false);
										setTeamsData(server_data['teams']);
									}
									})
			
			fetch(`http://localhost:5000/get/players/${db_data['players']}`)
			.then((response) => {return response.json();})
			.then((server_data) => {
									if (server_data['players'])
									{
										setIsLoadingPlayers(false);
										setPlayersData(server_data['players']);
									}
									})
		}
		else
		{
			setIsLoadingPlayers(false);
			setIsLoadingTeams(false);
			setTeamsData(undefined);
			setPlayersData(undefined);
		}
	}, [data])

	if(isLoadingPlayers || isLoadingTeams)
	{
		return (
			<div>
				<h2>WATCHLIST</h2>
				<h3>
				PLAYERS
				</h3>
				LOADING
				<h3>
				TEAMS
				</h3>
				LOADING
      		</div>
		);
	}



	if (!teamsData && !playersData)
	{
		return (
			<div>
				<h2>WATCHLIST</h2>
				<h3>
				PLAYERS
				</h3>
				EMPTY
				<h3>
				TEAMS
				</h3>
				EMPTY
	      	</div>
		);
	}

	if (teamsData && !playersData)
	{
		return (
			<div>
				<h2>WATCHLIST</h2>
				<h3>
				PLAYERS
				</h3>
				EMPTY
				<h3>
				TEAMS
				</h3>
				<BlurbsContainer>
				{Object.entries(teamsData.map((team) => (<MiniTeam key={team.id} id={team.id} name={team.name} logo={team.logo}/>)))}
				</BlurbsContainer>
	      	</div>
		);
		
	}

	if (playersData && !teamsData)
	{
		return (
			<div>
				<h2>WATCHLIST</h2>
				<h3>
				PLAYERS
				</h3>
				<BlurbsContainer>
				{Object.entries(playersData.map((player) => (<MiniPlayer key={player.id} id={player.id} firstName={player.firstname} lastName={player.lastname} picture={greyed_out}/>)))}
				</BlurbsContainer>
				<h3>
				TEAMS
				</h3>
				EMPTY
	      	</div>
		);
		
	}


	return (
		<div>
			<div>WATCHLIST</div>
			<h3>
			PLAYERS
			</h3>
			<BlurbsContainer>
			{Object.entries(playersData.map((player) => (<MiniPlayer key={player.id} id={player.id} firstName={player.firstname} lastName={player.lastname} picture={greyed_out}/>)))}
			</BlurbsContainer>
			<h3>
			TEAMS
			</h3>
			<BlurbsContainer>
			{Object.entries(teamsData.map((team) => (<MiniTeam key={team.id} id={team.id} name={team.name} logo={team.logo}/>)))}
			</BlurbsContainer>
      	</div>
	);

}

export default Watchlist;