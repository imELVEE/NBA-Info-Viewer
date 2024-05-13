import React from 'react';
import '../Blurbs.css';

const MiniTeam = ({id, name, logo}) => {
	return (
		<div className='teamCard'>
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