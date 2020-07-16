import { combineReducers } from "redux";
import { GlobalStateReducer } from "./GlobalStateReducer";
import { ExplorationStateReducer } from "./ExplorationStateReducer";

const RootReducer = combineReducers({GlobalState: GlobalStateReducer, ExplorationState: ExplorationStateReducer});

export default RootReducer;