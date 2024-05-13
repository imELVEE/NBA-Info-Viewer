import React, {useEffect, useState, createContext} from "react";
import AnchoredElements from "./AnchoredElements/AnchoredElements";
import SearchResults from "./SearchResults/SearchResults";
import TeamView from "./StatViews/FullTeam/TeamView";

export const SearchContext = createContext(undefined);
export const TeamStatsViewContext = createContext(undefined);
export const combinedSearchStatsContext = createContext(undefined);

const FlowController = () => {
  const [searching, setSearching] = useState(undefined);
  const [viewingStatsOf, setViewingStatsOf] = useState(false);

  if (searching)
  {
    return (
      <div>
        <SearchContext.Provider value={{searching, setSearching}}>
          <AnchoredElements />
        </SearchContext.Provider>
        <div>
        <combinedSearchStatsContext.Provider value={{searching, setSearching, viewingStatsOf, setViewingStatsOf}}>
          <SearchResults />
        </combinedSearchStatsContext.Provider>
        </div>
      </div>
    );
  }

  if (viewingStatsOf)
  {
    return (
      <div>
        <SearchContext.Provider value={{searching, setSearching}}>
          <AnchoredElements />
        </SearchContext.Provider>
        <div>
          <TeamStatsViewContext.Provider value={{viewingStatsOf, setViewingStatsOf}}>
          <TeamView id={viewingStatsOf[0]} name={viewingStatsOf[1]} logo={viewingStatsOf[2]} />
        </TeamStatsViewContext.Provider>
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
