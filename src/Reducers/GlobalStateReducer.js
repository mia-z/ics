import * as types from "../Actions/GlobalStateActionTypes";
import Timer from "../Objects/Timer";
import User from "../Objects/User";
import store from "./../store";
import { ExploreTile } from "./../Actions/HousingStateActions";

const initialState = {
    globalTicker: new Timer("global"),
    activityTickers: [],
    exploreStats: {
        Villages: 0, Farmlands: 0, Forest: 0, Desert: 0
    },
    user: new User()
};

export const GlobalStateReducer = (state = initialState, action) => {
    if (action.type === types.TICK_TIMER) {
        return {...state,
            globalTicker: {...state.globalTicker, tick: state.globalTicker.tick += 1}
        };
    }

    if (action.type === types.RESET_TIMER) {
        return {...state,
            globalTicker: {...state.globalTicker, tick: 0} 
        };
    }

    if (action.type === types.ASSIGN_TIMER_ID) {
        return {...state,
            globalTicker: {...state.globalTicker, id: action.payload}
        };
    }

    if (action.type === types.UPDATE_ACTIVITY_TICKERS) {
        return {...state,
            activityTickers: action.payload};
    }

    if (action.type === types.UPDATE_WORKERS) {
        return {...state, 
            user: {...state.user, workers: action.payload}
        };
    }

    if (action.type === types.APPLY_REWARD) {
        switch(action.payload.activity)
        {
            case "Explore": 
                return ExploreRewardState(state, action.payload);
            case "Mining":
                return MiningRewardState(state, action.payload);
            case "Woodcutting":
                return WoodcuttingRewardState(state, action.payload);
            default: return console.log("@@ERROR AT APPLY_REWARD ACTION IN GlobalStateReducer: action.payload.activity IS INCORRECT");
        }
    }
    return state;
};

const ExploreRewardState = (state, payload) => {
    //May need this later
    return { ...state };
}

const MiningRewardState = (state, payload) => {
    state.user.AddOre(payload.modifiers.extra, payload.modifiers.activeWorkers);
    return {...state, user: {...state.user } };
}

const WoodcuttingRewardState = (state, payload) => {
    state.user.AddWood(payload.modifiers.extra, payload.modifiers.activeWorkers);
    return {...state, user: {...state.user } };
}

export default GlobalStateReducer;