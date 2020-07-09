import { UPDATE_HOUSING_GRID, SELECT_TILE, EXPLORE_TILE, CONTROL_TILE, UNSELECT_TILE, BUILD_HOUSE, ASSIGN_WORKER } from "./HousingStateActionTypes";

const UpdateHousingGrid = (payload) => {
    return {type: UPDATE_HOUSING_GRID, payload}
}

const SelectTile = (tileX, tileY) => {
    return {type: SELECT_TILE, tileX, tileY}
}

const UnselectTile = (tileX, tileY) => {
    return {type: UNSELECT_TILE, tileX, tileY}
}

const ExploreTile = (tileX, tileY) => {
    return {type: EXPLORE_TILE, tileX, tileY}
}

const ControlTile = (tileX, tileY) => {
    return {type: CONTROL_TILE, tileX, tileY}
}

const BuildHouse = () => {
    return {type: BUILD_HOUSE}
}

const AssignWorker = () => {
    return {type: ASSIGN_WORKER}
}
export {
    UpdateHousingGrid,
    SelectTile,
    ExploreTile,
    ControlTile,
    UnselectTile,
    BuildHouse,
    AssignWorker
}