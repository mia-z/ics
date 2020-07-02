import { combineReducers } from "redux";
import { GlobalStateReducer } from "./GlobalStateReducer";
import { HousingStateReducer } from "./HousingStateReducer";

const RootReducer = combineReducers({GlobalState: GlobalStateReducer, HousingState: HousingStateReducer});

export default RootReducer;