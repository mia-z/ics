import * as types from "../Actions/ExplorationStateActionTypes";
import { TileStates, InitGrid, RefreshGrid } from "../Objects/Tile";

const initialState = {
    explorationState: InitGrid(),
    selectedTileCoords: {x: -1, y: -1},
    currentGatheringTileCoords: {x: -1, y: -1},
    selectedTile: null
};

export const ExplorationStateReducer = (state = initialState, action) => {
    if (action.type === types.UPDATE_GRID) {
        return {...state,
            explorationState: action.payload};
    }

    if (action.type === types.EXPLORE_TILE) {
        let x = action.tileX, y = action.tileY;
        let oldExplorationState = state.explorationState;
        oldExplorationState[y][x].state = TileStates.EXPLORED;
        if (y-1 !== -1 && oldExplorationState[y-1][x].state === TileStates.UNAVAILABLE) oldExplorationState[y-1][x].state = TileStates.UNEXPLORED;
        if (y+1 !== 11 && oldExplorationState[y+1][x].state === TileStates.UNAVAILABLE) oldExplorationState[y+1][x].state = TileStates.UNEXPLORED;
        if (x-1 !== -1 && oldExplorationState[y][x-1].state === TileStates.UNAVAILABLE) oldExplorationState[y][x-1].state = TileStates.UNEXPLORED;
        if (x+1 !== 11 && oldExplorationState[y][x+1].state === TileStates.UNAVAILABLE) oldExplorationState[y][x+1].state = TileStates.UNEXPLORED;
        let newExplorationState = RefreshGrid(oldExplorationState);
        return {...state, explorationState: [...newExplorationState]};
    }

    if (action.type === types.SELECT_TILE) {
        let oldExplorationState = state.explorationState;
        if (state.selectedTileCoords.x !== -1) {
            oldExplorationState[state.selectedTileCoords.y][state.selectedTileCoords.x].selected = false;
        }
        oldExplorationState[action.tileY][action.tileX].selected = true;
        let newExplorationState = RefreshGrid(oldExplorationState);
        let selectedCoords = { x: action.tileX, y: action.tileY };
        return {
            explorationState: newExplorationState, selectedTileCoords: { ...selectedCoords }, selectedTile: newExplorationState[selectedCoords.y][selectedCoords.x] };
    }

    if (action.type === types.UNSELECT_TILE) {
        let oldExplorationState = state.explorationState;
        oldExplorationState[action.tileY][action.tileX].selected = false;
        let newExplorationState = RefreshGrid(oldExplorationState);
        let selectedCoords = { x: -1, y: -1 };
        return {
            explorationState: newExplorationState, selectedTileCoords: { ...selectedCoords } };
    }

    if (action.type === types.UPDATE_STYLE) {
        return {...state,
            housingStyles: action.payload};
    }

    if (action.type === types.UPDATE_GATHERING_NODE) {
        let newExplorationState = state.explorationState;
        let newNodes = {...newExplorationState[action.y][action.x].gatheringNodes[action.outerArrayIndex][action.arrayIndex]};   //This is really ugly and should be refactored when im less sleepy
        newNodes.health = newNodes.health - action.amount;                                                                       //This is really ugly and should be refactored when im less sleepy
        newExplorationState[action.y][action.x].gatheringNodes[action.outerArrayIndex][action.arrayIndex] = newNodes;            //This is really ugly and should be refactored when im less sleepy
        return {...state,
            explorationState: [...newExplorationState], selectedTile: {...newExplorationState[action.y][action.x]} };
    }

    if (action.type === types.UPDATE_CURRENT_GATHERING_NODE_COORDS) {
        return {...state,
            currentGatheringTileCoords: {x: action.x, y: action.y}
        };
    }

    return state;
};

export default ExplorationStateReducer;