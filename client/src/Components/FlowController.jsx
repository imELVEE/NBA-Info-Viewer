import React, {useEffect, useState, createContext} from "react";
import AnchoredElements from "./AnchoredElements/AnchoredElements";
import SearchResults from "./SearchResults/SearchResults";
import TeamView from "./StatViews/FullTeam/TeamView";
import Homepage from "./Homepage/Homepage";

export const SearchAndDataContext = createContext(undefined);
export const TeamStatsViewContext = createContext(undefined);
export const combinedSearchStatsContext = createContext(undefined);

const FlowController = () => {
  const [searching, setSearching] = useState(undefined);
  const [viewingStatsOf, setViewingStatsOf] = useState(undefined);
  const [userData, setUserData] = useState(undefined);

  console.log(`from flowcontrller data: ${JSON.stringify(userData)}`);

  if (searching)
  {
    return (
      <div>
        <SearchAndDataContext.Provider value={{searching, setSearching, userData, setUserData, viewingStatsOf, setViewingStatsOf}}>
          <AnchoredElements />
        </SearchAndDataContext.Provider>
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
        <SearchAndDataContext.Provider value={{searching, setSearching, userData, setUserData,  viewingStatsOf, setViewingStatsOf}}>
          <AnchoredElements />
        </SearchAndDataContext.Provider>
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
      <SearchAndDataContext.Provider value={{searching, setSearching, userData, setUserData,  viewingStatsOf, setViewingStatsOf}}>
        <AnchoredElements />
      </SearchAndDataContext.Provider>
      <div>
        <combinedSearchStatsContext.Provider value={{searching, setSearching, viewingStatsOf, setViewingStatsOf}}>
          <Homepage data={userData}/>
        </combinedSearchStatsContext.Provider>
      </div>
    </div>
  );
}

export default FlowController;
