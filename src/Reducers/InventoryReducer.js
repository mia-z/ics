import * as types from "../Actions/InventoryActionTypes";
import { GetItemById } from "../ItemRepo";

const initialState = {
    Items: [
        // { Item: GetItemById(0), Amount: 5 },
        // { Item: GetItemById(1), Amount: 5 },
        // { Item: GetItemById(2), Amount: 5 },
        // { Item: GetItemById(3), Amount: 5 },
        // { Item: GetItemById(4), Amount: 5 },
        // { Item: GetItemById(5), Amount: 5 },
        // { Item: GetItemById(6), Amount: 5 },
        // { Item: GetItemById(7), Amount: 5 },
        // { Item: GetItemById(8), Amount: 5 },
        // { Item: GetItemById(9), Amount: 5 },
        // { Item: GetItemById(10), Amount: 5 },
        // { Item: GetItemById(11), Amount: 5 },
    ]
}

export const InventoryReducer = (state = initialState, action) => {
    if (action.type === types.ADD_ITEM) {
        if (state.Items.some(x => x.Id === action.item.Id)) {
            let itemIndex = state.Items.findIndex(item => item.Id === action.item.Id);
            state.Items[itemIndex].Amount += action.itemAmt;
            return {...state,
                Items: [...state.Items]
            };
        } else
            return {...state,
                Items: [...state.Items, { ...action.item, Amount: action.itemAmt}]
        };
    }

    if (action.type === types.USE_ITEM) {
        let updatedItemsArray = state.Items.filter(x => x.itemId !== action.itemId);
        let itemToUpdate = state.Items.find(x => x.itemId === action.itemId);
        itemToUpdate.itemAmt -= action.itemAmt;
        if (itemToUpdate.itemAmt < 1)
            return {...state,
                Items: [...updatedItemsArray]
            };
        else return {...state,
            Items: [...updatedItemsArray, itemToUpdate]
        };
    }

    return {...state};
}

