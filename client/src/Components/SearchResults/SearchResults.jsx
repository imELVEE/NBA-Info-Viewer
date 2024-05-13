import React, {useRef, useEffect, useContext} from "react";
import {SearchContext} from "../FlowController";

const SearchResults = () => {
	const SearchContent = useContext(SearchContext);

	return (
		<h1>
          You searched for {SearchContent.searching}!
      	</h1>
	);
}

export default SearchResults;