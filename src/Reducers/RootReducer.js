import * as types from "../Actions/ActionTypes";
import Timer from "../Objects/Timer";
import User from "../Objects/User";

const initalState = {
    globalTicker: new Timer("global"),
    activityTickers: [],
    exploreStats: {
        villages: 0, farmlands: 0, forest: 0, desert: 0
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
            default: 
                return { ...state, currentActivity: "Idle" };
        }
    }
    return state;
};

const ExploreRewardState = (state, payload) => {
    switch(payload.location)
    {
        case "Villages": return { ...state, exploreStats: { ...state.exploreStats, villages: state.exploreStats.villages += 1} };
        case "Farmlands": return { ...state, exploreStats: { ...state.exploreStats, farmlands: state.exploreStats.farmlands += 1} };
        case "Forest": return { ...state, exploreStats: { ...state.exploreStats, forest: state.exploreStats.forest += 1} };
        case "Desert": return { ...state, exploreStats: { ...state.exploreStats, desert: state.exploreStats.desert += 1} };
        default: console.log("this shouldnt happen"); return {...state};
    }
}

export default RootReducer;