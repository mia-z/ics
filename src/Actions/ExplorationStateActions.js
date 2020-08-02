import {
    UPDATE_GRID,
    SELECT_TILE,
    EXPLORE_TILE,
    CONTROL_TILE,
    UNSELECT_TILE,
    UPDATE_STYLE,
    UPDATE_CURRENT_GATHERING_NODE_COORDS,
    UPDATE_GATHERING_NODE
} from "./ExplorationStateActionTypes";

const UpdateGrid = (payload) => {
    return {type: UPDATE_GRID, payload}
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

const UpdateStyle = (style) => {
    return {type: UPDATE_STYLE, style}
}

const UpdateGatheringNode = (x, y, amount = 1, arrayIndex, outerArrayIndex) => {
    return {type: UPDATE_GATHERING_NODE, x, y, amount, arrayIndex, outerArrayIndex}
}

const UpdateCurrentGatheringNodeCoords = (x, y) => {
    return {type: UPDATE_CURRENT_GATHERING_NODE_COORDS, x, y}
}


export {
    UpdateGrid,
    SelectTile,
    ExploreTile,
    ControlTile,
    UnselectTile,
    UpdateStyle,
    UpdateGatheringNode,
    UpdateCurrentGatheringNodeCoords
}