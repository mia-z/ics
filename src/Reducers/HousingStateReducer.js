import * as types from "../Actions/HousingStateActionTypes";
import { TileStates, InitGrid, RefreshGrid } from "../Objects/Tile";

const initialState = {
    housingState: InitGrid(),
    selectedTileCoords: {x: -1, y: -1}
};

export const HousingStateReducer = (state = initialState, action) => {
    if (action.type === types.UPDATE_HOUSING_GRID) {
        return {...state,
            housingState: action.payload}
    }

    if (action.type === types.EXPLORE_TILE) {
        let x = action.tileX, y = action.tileY;
        let oldHousingState = state.housingState;
        oldHousingState[y][x].explore();
        if (y-1 !== -1 && oldHousingState[y-1][x].state === TileStates.UNAVAILABLE) oldHousingState[y-1][x].setUnexplored();
        if (y+1 !== 11 && oldHousingState[y+1][x].state === TileStates.UNAVAILABLE) oldHousingState[y+1][x].setUnexplored();
        if (x-1 !== -1 && oldHousingState[y][x-1].state === TileStates.UNAVAILABLE) oldHousingState[y][x-1].setUnexplored();
        if (x+1 !== 11 && oldHousingState[y][x+1].state === TileStates.UNAVAILABLE) oldHousingState[y][x+1].setUnexplored();
        let newHousingState = RefreshGrid(oldHousingState);
        return {...state, housingState: newHousingState};
    }

    if (action.type === types.CONTROL_TILE) {
        let x = action.tileX, y = action.tileY;
        let oldHousingState = state.housingState;
        oldHousingState[y][x].control();
        let newHousingState = RefreshGrid(oldHousingState);
        return {...state, housingState: newHousingState};
    }

    if (action.type === types.BUILD_HOUSE) {
        let oldHousingState = state.housingState;
        oldHousingState[state.selectedTileCoords.y][state.selectedTileCoords.x].buildHouseOnPlot();
        let newHousingState = RefreshGrid(oldHousingState);
        return { ...state,
            housingState: newHousingState };
    }

    if (action.type === types.SELECT_TILE) {
        let oldHousingState = state.housingState;
        if (state.selectedTileCoords.x !== -1) {
            oldHousingState[state.selectedTileCoords.y][state.selectedTileCoords.x].unselect();
        }
        oldHousingState[action.tileY][action.tileX].select();
        let newHousingState = RefreshGrid(oldHousingState);
        let selectedCoords = { x: action.tileX, y: action.tileY };
        return {
            housingState: newHousingState, selectedTileCoords: { ...selectedCoords } };
    }

    if (action.type === types.UNSELECT_TILE) {
        let oldHousingState = state.housingState;
        oldHousingState[action.tileY][action.tileX].unselect();
        let newHousingState = RefreshGrid(oldHousingState);
        let selectedCoords = { x: -1, y: -1 };
        return {
            housingState: newHousingState, selectedTileCoords: { ...selectedCoords } };
    }

    if (action.type === types.ASSIGN_WORKER) {
        let oldHousingState = state.housingState;
        oldHousingState[state.selectedTileCoords.y][state.selectedTileCoords.x].assignWorkerToHouse();
        let newHousingState = RefreshGrid(oldHousingState);
        return { ...state,
            housingState: newHousingState };
    }

    if (action.type === types.UPDATE_STYLE) {
        return {...state,
            housingStyles: action.payload};
    }

    return state;
};

export default HousingStateReducer;