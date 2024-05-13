import React from 'react';
import "../Blurbs.css";

const StatsCard = ({title, data}) => {
	return (
		<div className='statsCard'>
			<span style={{color:'white'}}>
				<h3>
				{title}
				</h3>
				<h1>
				{data}
				</h1>
			</span>
		</div>
	);
}

export default StatsCard;