import { UPDATE_HOUSING_GRID, SELECT_TILE, PURCHASE_TILE, UNSELECT_TILE } from "./HousingStateActionTypes";

const UpdateHousingGrid = (payload) => {
    return {type: UPDATE_HOUSING_GRID, payload}
}

const SelectTile = (tileX, tileY) => {
    return {type: SELECT_TILE, tileX, tileY}
}

const UnselectTile = (tileX, tileY) => {
    return {type: UNSELECT_TILE, tileX, tileY}
}

const PurchaseTile = (tileX, tileY) => {
    return {type: PURCHASE_TILE, tileX, tileY}
}

export {
    UpdateHousingGrid,
    SelectTile,
    PurchaseTile,
    UnselectTile
}