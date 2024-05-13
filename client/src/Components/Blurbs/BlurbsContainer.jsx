import React from 'react';
import "./Blurbs.css"

const BlurbsContainer = (props) => {
	return (
		<div id='cardsContainer'>
			{props.children}
		</div>
	);
}

export default BlurbsContainer;