import React, {useEffect, useState, createContext} from "react";
import AnchoredElements from "./AnchoredElements/AnchoredElements";
import SearchResults from "./SearchResults/SearchResults";

export const SearchContext = createContext(undefined);

const FlowController = () => {
  const [searching, setSearching] = useState(undefined);

  if (searching)
  {
    return (
      <div>
        <SearchContext.Provider value={{searching, setSearching}}>
          <AnchoredElements />
        </SearchContext.Provider>
        <div>
          <SearchContext.Provider value={{searching, setSearching}}>
          <SearchResults />
        </SearchContext.Provider>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SearchContext.Provider value={{searching, setSearching}}>
        <AnchoredElements />
      </SearchContext.Provider>
      <div>
        HOMEPAGE!
      </div>
    </div>
  );
}

export default FlowController;
