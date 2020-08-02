import { combineReducers } from "redux";
import { GlobalStateReducer } from "./GlobalStateReducer";
import { ExplorationStateReducer } from "./ExplorationStateReducer";
import { InventoryReducer } from "./InventoryReducer";

const RootReducer = combineReducers({
    GlobalState: GlobalStateReducer,
    ExplorationState: ExplorationStateReducer,
    Inventory: InventoryReducer,
});

export default RootReducer;