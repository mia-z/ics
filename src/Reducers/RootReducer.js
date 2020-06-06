import * as types from "../Actions/ActionTypes";

const initalState = {
    texts: [], 
    count: 0
};

const RootReducer = (state = initalState, action) => {
    if (action.type === types.ADD_TEXT) {
        return Object.assign({}, state, {
            text: state.texts.concat(action.payload)
        });
    }

    if (action.type === types.INC_NUMBER) {
        return Object.assign({}, state, {
            count: state.count + 1
        });
    }

    if (action.type === types.DEC_NUMBER) {
        return Object.assign({}, state, {
            count: state.count - 1
        });
    }
    return state;
};

export default RootReducer;