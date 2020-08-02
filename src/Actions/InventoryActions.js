import * as types from "./InventoryActionTypes";

const AddItem = (item, itemAmt = 1) => {
    return {type: types.ADD_ITEM, item, itemAmt}
}

const UseItem = (itemId, itemAmt = 1) => {
    return {type: types.USE_ITEM, itemId, itemAmt}
}

export {
    AddItem,
    UseItem
}