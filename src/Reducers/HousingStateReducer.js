import * as types from "../Actions/HousingStateActionTypes";
import Tile, { InitGrid, RefreshGrid } from "../Objects/Tile";

const initalState = {
    housingState: InitGrid(),
    selectedTileCoords: {x: -1, y: -1}
};

export const HousingStateReducer = (state = initalState, action) => {
    if (action.type === types.UPDATE_HOUSING_GRID) {
        return {...state,
            housingState: action.payload}
    }

    if (action.type === types.PURCHASE_TILE) {
        let x = action.tileX, y = action.tileY;
        let oldHousingState = state.housingState;
        oldHousingState[y][x].purchase();
        if (y-1 !== -1 && oldHousingState[y-1][x].state === "UNAVAILABLE") oldHousingState[y-1][x].setUnpurchased();
        if (y+1 !== 11 && oldHousingState[y+1][x].state === "UNAVAILABLE") oldHousingState[y+1][x].setUnpurchased();
        if (x-1 !== -1 && oldHousingState[y][x-1].state === "UNAVAILABLE") oldHousingState[y][x-1].setUnpurchased();
        if (x+1 !== 11 && oldHousingState[y][x+1].state === "UNAVAILABLE") oldHousingState[y][x+1].setUnpurchased();
        let newHousingState = RefreshGrid(oldHousingState);
        return {...state, housingState: newHousingState};
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

    return state;
};

export default HousingStateReducer;