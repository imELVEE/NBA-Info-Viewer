import React, {useContext} from 'react';
import '../Blurbs.css';

import {combinedSearchStatsContext} from "../../FlowController";

const MiniTeam = ({id, name, logo}) => {
	const TeamStatsViewInfo = useContext(combinedSearchStatsContext);

	const initiateTeamView = () => {
		TeamStatsViewInfo.setSearching(undefined);
		TeamStatsViewInfo.setViewingStatsOf([id, name, logo]);
	}

	return (
		<div className='teamCard' onClick={initiateTeamView}>
			<img
			src={logo}
			alt='Team Logo'
			/>
			<h4 className='name'>
			{name}
			</h4>
		</div>
	);
}

export default MiniTeam;