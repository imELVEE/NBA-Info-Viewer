import React from "react";
import Searchfield from "./Searchbar/Searchfield";
import SignIn from "./SignIn/SignIn";
import "./AnchoredElements.css"

const AnchoredElements = () => {
	return (
		<div className="TopBar">
			<Searchfield />
			<SignIn />
		</div>
	)
};

export default AnchoredElements;