import * as types from "../Actions/ActionTypes";
import Timer from "../Objects/Timer";
import User from "../Objects/User";

const initalState = {
    globalTicker: new Timer("global"),
    activityTickers: [],
    exploreStats: {
        Villages: 0, Farmlands: 0, Forest: 0, Desert: 0
    },
    user: new User()

};

const RootReducer = (state = initalState, action) => {
    if (action.type === types.CHANGE_ACTIVITY) {
        return {...state,
            currentActivity: action.payload
        };
    }

    if (action.type === types.EXPLORE_LOCATION) {
        return {...state,
            currentExploreLocation: action.payload
        };
    }

    if (action.type === types.TICK_TIMER) {
        return {...state,
            globalTicker: {...state.activityTimer, tick: state.globalTicker.tick += 1}
        };
    }

    if (action.type === types.RESET_TIMER) {
        return {...state,
            globalTicker: {...state.globalTicker, tick: 0} 
        };
    }

    if (action.type === types.UPDATE_ACTIVITY_TICKERS) {
        return {...state, 
            activityTickers: action.payload}
    }

    if (action.type === types.APPLY_REWARD) {
        switch(action.payload.activity)
        {
            case "Explore": 
                return ExploreRewardState(state, action.payload);
            case "Mining": 
                return MiningRewardState(state, action.payload);
            default: throw "Tried to apply a reward that went wrong!";
        }
    }
    return state;
};

const ExploreRewardState = (state, payload) => {
    console.log(payload);
    return { ...state, exploreStats: { ...state.exploreStats, [payload.modifiers.extra]: state.exploreStats[payload.modifiers.extra] += 1} };
}

const MiningRewardState = (state, payload) => {
    state.user.AddOre(payload.modifiers.extra, payload.modifiers.activeWorkers);
    return {...state, user: {...state.user } };
}

export default RootReducer;