import React from 'react';
import "../games.css";

const Feature = ({status, home_team, away_team, home_score, away_score}) => {
	var score = (home_score === null) ? ('0 : 0') : (`${home_score} : ${away_score}`)

	return (
		<div className='game'>
			<div className='status'>
				<h3>
				{status}
				</h3>
			</div>
			<div className='participants'>
				<h4>
				{home_team} vs {away_team}
				</h4>
			</div>
			<div className='score'>
				<h5>
				{score}
				</h5>
			</div>
		</div>
	);
}

export default Feature;