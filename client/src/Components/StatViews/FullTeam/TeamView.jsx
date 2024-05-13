import React, {useState, useContext, useEffect} from 'react';
import StatsCard from "../../Blurbs/StatsCard/StatsCard";
import "../stats.css";

import {TeamStatsViewContext} from "../../FlowController";

const TeamView = ({id, name, logo}) => {
	const [season, setSeason] = useState(2023);
	const [statsData, setStatsData] = useState(undefined);
	const [isLoadingStats, setIsLoadingStats] = useState(true);
	const [serverStatus, setServerStatus] = useState('Down');

	const TeamStatsViewInfo = useContext(TeamStatsViewContext);

	useEffect(() => {
		fetch('http://localhost:5000/stats/teams/'+id+'/'+season)
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
			.then((data) => {setStatsData(data);})
			.catch((response) => {console.log('SERVER MAY BE DOWN');})
			.finally(() => {setIsLoadingStats(false);})
	}, [id, season])


	let currentText = '';
	const submitHandler = (e) => {
		if (currentText)
		{
			e.preventDefault();
			setSeason(currentText);
			currentText = '';
		}
	}

	if (serverStatus === 'Down')
	{
		return (
			<div>
				<div className='banner'>
					<div className='prof'>
						<img
						src={logo}
						alt='Team Logo'
						/>
						<h1 className='name'>
						{name} ({season})
						</h1>
					</div>
					<form onSubmit={submitHandler} className='seasonSearch'>
					  <div>
					    <label>Season </label>
					    <input type="search" 
					    	placeholder="Enter Year" 
					    	onChange={(e) => {currentText = e.target.value}}/>
					  </div>
					</form>
				</div>
				<div> Server Down </div>
			</div>
		);
	}

	if (isLoadingStats)
	{
		return (
			<div>
				<div className='banner'>
					<div className='prof'>
						<img
						src={logo}
						alt='Team Logo'
						/>
						<h1 className='name'>
						{name} ({season})
						</h1>
					</div>
					<form onSubmit={submitHandler} className='seasonSearch'>
					  <div>
					    <label>Season </label>
					    <input type="search" 
					    	placeholder="Enter Year" 
					    	onChange={(e) => {currentText = e.target.value}}/>
					  </div>
					</form>
				</div>
				<div>Loading Stats</div>
	      	</div>
		);
	}

	if (statsData)
	{
		return (
			<div>
				<div className='banner'>
					<div className='prof'>
						<img
						src={logo}
						alt='Team Logo'
						/>
						<h1 className='name'>
						{name} ({season})
						</h1>
					</div>
					<form onSubmit={submitHandler} className='seasonSearch'>
					  <div>
					    <label>Season</label>
					    <input type="search" 
					    	placeholder="Enter Year" 
					    	onChange={(e) => {currentText = e.target.value}}/>
					  </div>
					</form>
				</div>
				<div className='stats'>
					{Object.entries(statsData["response"][0]).map(([key,value]) => (<StatsCard key={key} title={key} data={value} />))}
				</div>
			</div>
		);
	}
}

export default TeamView;