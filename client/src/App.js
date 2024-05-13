import React, {useEffect, useState, createContext} from "react";
import logo from './logo.svg';
import './App.css';
import ServerRequest from "./Components/ServerRequest/ServerRequest";
import AnchoredElements from "./Components/AnchoredElements/AnchoredElements";
import FlowController from "./Components/FlowController";

export const SearchContext = createContext(undefined);

function App() {
  return (
    <div>
      <FlowController />
    </div>
  );
}

export default App;
