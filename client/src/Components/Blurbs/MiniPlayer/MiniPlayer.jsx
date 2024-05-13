import React from 'react';
import "../Blurbs.css";

const MiniPlayer = ({id, firstName, lastName, picture}) => {
	return (
		<div className='playerCard'>
			<img
			src={picture}
			alt='Headshot'
			/>
			<h5 className='name'>
			{firstName} {lastName}
			</h5>
		</div>
	);
}

export default MiniPlayer;