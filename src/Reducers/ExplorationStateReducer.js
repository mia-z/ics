import * as types from "../Actions/ExplorationStateActionTypes";
import { TileStates, InitGrid, RefreshGrid } from "../Objects/Tile";

const initialState = {
    explorationState: InitGrid(),
    selectedTileCoords: {x: -1, y: -1}
};

export const ExplorationStateReducer = (state = initialState, action) => {
    if (action.type === types.UPDATE_GRID) {
        return {...state,
            explorationState: action.payload}
    }

    if (action.type === types.EXPLORE_TILE) {
        let x = action.tileX, y = action.tileY;
        let oldExplorationState = state.explorationState;
        oldExplorationState[y][x].explore();
        if (y-1 !== -1 && oldExplorationState[y-1][x].state === TileStates.UNAVAILABLE) oldExplorationState[y-1][x].setUnexplored();
        if (y+1 !== 11 && oldExplorationState[y+1][x].state === TileStates.UNAVAILABLE) oldExplorationState[y+1][x].setUnexplored();
        if (x-1 !== -1 && oldExplorationState[y][x-1].state === TileStates.UNAVAILABLE) oldExplorationState[y][x-1].setUnexplored();
        if (x+1 !== 11 && oldExplorationState[y][x+1].state === TileStates.UNAVAILABLE) oldExplorationState[y][x+1].setUnexplored();
        let newExplorationState = RefreshGrid(oldExplorationState);
        return {...state, explorationState: newExplorationState};
    }

    if (action.type === types.CONTROL_TILE) {
        let x = action.tileX, y = action.tileY;
        let oldExplorationState = state.explorationState;
        oldExplorationState[y][x].control();
        let newExplorationState = RefreshGrid(oldExplorationState);
        return {...state, explorationState: newExplorationState};
    }

    if (action.type === types.BUILD_HOUSE) {
        let oldExplorationState = state.explorationState;
        oldExplorationState[state.selectedTileCoords.y][state.selectedTileCoords.x].buildHouseOnPlot();
        let newExplorationState = RefreshGrid(oldExplorationState);
        return { ...state,
            explorationState: newExplorationState };
    }

    if (action.type === types.SELECT_TILE) {
        let oldExplorationState = state.explorationState;
        if (state.selectedTileCoords.x !== -1) {
            oldExplorationState[state.selectedTileCoords.y][state.selectedTileCoords.x].unselect();
        }
        oldExplorationState[action.tileY][action.tileX].select();
        let newExplorationState = RefreshGrid(oldExplorationState);
        let selectedCoords = { x: action.tileX, y: action.tileY };
        return {
            explorationState: newExplorationState, selectedTileCoords: { ...selectedCoords } };
    }

    if (action.type === types.UNSELECT_TILE) {
        let oldExplorationState = state.explorationState;
        oldExplorationState[action.tileY][action.tileX].unselect();
        let newExplorationState = RefreshGrid(oldExplorationState);
        let selectedCoords = { x: -1, y: -1 };
        return {
            explorationState: newExplorationState, selectedTileCoords: { ...selectedCoords } };
    }

    if (action.type === types.ASSIGN_WORKER) {
        let oldExplorationState = state.explorationState;
        oldExplorationState[state.selectedTileCoords.y][state.selectedTileCoords.x].assignWorkerToHouse();
        let newExplorationState = RefreshGrid(oldExplorationState);
        return { ...state,
            explorationState: newExplorationState };
    }

    if (action.type === types.UPDATE_STYLE) {
        return {...state,
            housingStyles: action.payload};
    }

    return state;
};

export default ExplorationStateReducer;