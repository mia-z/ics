import * as types from "../Actions/InventoryActionTypes";

const initialState = {
    Items: []
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

