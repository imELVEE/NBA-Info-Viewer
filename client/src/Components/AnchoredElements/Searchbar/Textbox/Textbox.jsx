import React, {useState, useContext} from "react";
import {SearchAndDataContext} from "../../../FlowController";

const Textbox = () => {
	const searchContent = useContext(SearchAndDataContext)
	const [currentText, setCurrentText] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		searchContent.setSearching(currentText);
		setCurrentText('');
	}

	return (
		<form onSubmit={submitHandler}>
		  <div>
		    <label>Search </label>
		    <input type="search" 
		    	placeholder="Search Teams & Players" 
		    	value={currentText} 
		    	onChange={(e) => {setCurrentText(e.target.value)}}/>
		  </div>
		</form>
	);
};

export default Textbox;