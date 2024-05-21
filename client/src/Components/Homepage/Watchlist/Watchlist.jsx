import React, {useEffect, useState} from 'react';
import BlurbsContainer from '../../Blurbs/BlurbsContainer';
import MiniTeam from "../../Blurbs/MiniTeam/MiniTeam";
import MiniPlayer from "../../Blurbs/MiniPlayer/MiniPlayer";
import greyed_out from "../../../assets/greyed_out.png";

const Watchlist = ({data, setData}) => {
	const [isLoadingPlayers, setIsLoadingPlayers] = useState(true);
	const [isLoadingTeams, setIsLoadingTeams] = useState(true);
	const [playersData, setPlayersData] = useState(undefined);
	const [teamsData, setTeamsData] = useState(undefined);

	//console.log(`watchlist: ${JSON.stringify(data)} and length: ${data.length}`);

	useEffect(() => {
		if (data && Object.keys(data).length > 0)
		{	
			if (data['teams'].length > 0)
			{
				fetch(`http://localhost:5000/get/teams/${data['teams']}`)
					.then((response) => {return response.json();})
					.then((server_data) => {if (server_data['teams'])
											{
												setIsLoadingTeams(false);
												setTeamsData(server_data['teams']);
											}
											})
			}
			else
			{
				setIsLoadingTeams(false);
				if (teamsData)
					setTeamsData(undefined);
			}
			
			if (data['players'].length > 0)
			{
				fetch(`http://localhost:5000/get/players/${data['players']}`)
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
				if (playersData)
					setPlayersData(undefined);
			}
			

			//console.log(`players data: ${playersData} ,,, teams data: ${teamsData}`);
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
				{Object.entries(teamsData.map((team) => (<MiniTeam key={team.id} id={team.id} name={team.name} logo={team.logo} userData={data} setUserData={setData}/>)))}
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
				{Object.entries(playersData.map((player) => (<MiniPlayer key={player.id} id={player.id} firstName={player.firstname} lastName={player.lastname} picture={greyed_out} userData={data} setUserData={setData}/>)))}
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
			<h2>WATCHLIST</h2>
			<h3>
			PLAYERS
			</h3>
			<BlurbsContainer>
			{Object.entries(playersData.map((player) => (<MiniPlayer key={player.id} id={player.id} firstName={player.firstname} lastName={player.lastname} picture={greyed_out} userData={data} setUserData={setData}/>)))}
			</BlurbsContainer>
			<h3>
			TEAMS
			</h3>
			<BlurbsContainer>
			{Object.entries(teamsData.map((team) => (<MiniTeam key={team.id} id={team.id} name={team.name} logo={team.logo} userData={data} setUserData={setData}/>)))}
			</BlurbsContainer>
      	</div>
	);

}

export default Watchlist;