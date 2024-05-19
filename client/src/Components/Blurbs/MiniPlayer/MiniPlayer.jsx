import React from 'react';
import "../Blurbs.css";

const MiniPlayer = ({id, firstName, lastName, picture}) => {
	return (
		<a href={"https://www.google.com/search?q="+firstName+"+"+lastName}>
			<div className='playerCard'>
				<img
				src={picture}
				alt='Headshot'
				/>
				<h5 className='name'>
				{firstName} {lastName}
				</h5>
			</div>
		</a>
	);
}

export default MiniPlayer;