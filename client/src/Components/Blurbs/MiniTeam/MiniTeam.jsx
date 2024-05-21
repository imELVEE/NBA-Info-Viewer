import React, {useContext} from 'react';
import '../Blurbs.css';
import CollectionButton from '../CollectionButton';

import {combinedSearchStatsContext} from "../../FlowController";

const MiniTeam = ({id, name, logo, userData, setUserData}) => {
	const TeamStatsViewInfo = useContext(combinedSearchStatsContext);

	const initiateTeamView = () => {
		TeamStatsViewInfo.setSearching(undefined);
		TeamStatsViewInfo.setViewingStatsOf([id, name, logo]);
	}

	//console.log(`MiniTeam: ${JSON.stringify(userData)}`);

	return (
		<div className='teamCard' onClick={initiateTeamView}>
			<img
			src={logo}
			alt='Team Logo'
			/>
			<div className="descript">
				<h4 className='name'>
				{name}
				</h4>
				<CollectionButton id={id} data={userData} team={true} setData={setUserData}/>
			</div>
		</div>
	);
}

export default MiniTeam;