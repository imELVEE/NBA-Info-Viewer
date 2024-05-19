import React, {useState, useContext} from "react";
import {SearchAndDataContext} from "../../../FlowController";
import home_icon from '../../../../assets/home_icon.jpg';

const Textbox = () => {
	const searchContent = useContext(SearchAndDataContext)
	const [currentText, setCurrentText] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		searchContent.setSearching(currentText);
		setCurrentText('');
	}

	const returnHome = () => {
		searchContent.setViewingStatsOf(undefined);
		searchContent.setSearching(undefined);
	}

	return (
		<form onSubmit={submitHandler} className="Searchbar">
			<button onClick={returnHome}>
		    	<img
		    	src={home_icon}
		    	width='30px'
		    	alt='Home'
		    	/>
	    	</button>
		  <div>
		    <input type="search" 
		    	placeholder="Search Teams & Players" 
		    	value={currentText} 
		    	onChange={(e) => {setCurrentText(e.target.value)}}/>
		  </div>
		</form>
	);
};

export default Textbox;