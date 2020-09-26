import { combineReducers } from "redux";
import { GlobalStateReducer } from "./GlobalStateReducer";
import { ExplorationStateReducer } from "./ExplorationStateReducer";
import { InventoryReducer } from "./InventoryReducer";
import { SkillsStateReducer } from "./SkillsStateReducer";

const RootReducer = combineReducers({
    GlobalState: GlobalStateReducer,
    ExplorationState: ExplorationStateReducer,
    Inventory: InventoryReducer,
    Skills: SkillsStateReducer,
});

export default RootReducer;