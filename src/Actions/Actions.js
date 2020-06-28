import { CHANGE_ACTIVITY, EXPLORE_LOCATION, TOGGLE_TIMER, TICK_TIMER, ASSIGN_TIMER_ID, RESET_TIMER, APPLY_REWARD, UPDATE_ACTIVITY_TICKERS, UPDATE_WORKERS } from "./ActionTypes";

const ChangeActivity = (payload) => {
    return { type: CHANGE_ACTIVITY, payload }
}

const ExploreLocation = (payload) => {
    return { type: EXPLORE_LOCATION, payload }
}

const ToggleTimer = (payload) => {
    return { type: TOGGLE_TIMER, payload }
}

const TickTimer = (payload) => {
    return { type: TICK_TIMER, payload }
}

const AssignTimerId = (payload) => {
    return {type: ASSIGN_TIMER_ID, payload }
}

const ResetTimer = (payload) => {
    return {type: RESET_TIMER, payload }
}

const ApplyReward = (activity, extraArgs) => {
    return {type: APPLY_REWARD, payload: { activity, ...extraArgs } }
}

const UpdateActivityTickers = (payload) => {
    return {type: UPDATE_ACTIVITY_TICKERS, payload}
}

const UpdateWorkers = (payload) => {
    return {type: UPDATE_WORKERS, payload}
}

export {
    ChangeActivity,
    ExploreLocation,
    ToggleTimer,
    TickTimer,
    AssignTimerId,
    ResetTimer,
    ApplyReward,
    UpdateActivityTickers,
    UpdateWorkers
}