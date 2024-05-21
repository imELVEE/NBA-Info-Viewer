import React from 'react';
import "../Blurbs.css";
import CollectionButton from '../CollectionButton';

const MiniPlayer = ({id, firstName, lastName, picture, userData, setUserData}) => {

	//console.log(`MiniPlayer: ${JSON.stringify(userData)}`);

	return (
		<a href={"https://www.google.com/search?q="+firstName+"+"+lastName}>
			<div className='playerCard'>
				<img
				src={picture}
				alt='Headshot'
				/>
				<div className="descript">
					<h5 className='name'>
					{firstName} {lastName}
					</h5>
					<CollectionButton id={id} data={userData} team={false} setData={setUserData}/>
				</div>
			</div>
		</a>
	);
}

export default MiniPlayer;