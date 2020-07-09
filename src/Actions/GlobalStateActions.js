import { TICK_TIMER, RESET_TIMER, APPLY_REWARD, UPDATE_ACTIVITY_TICKERS, UPDATE_WORKERS, ASSIGN_TIMER_ID } from "./GlobalStateActionTypes";

const TickTimer = (payload) => {
    return { type: TICK_TIMER, payload }
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

const AssignTimerId = (payload) => {
    return {type: ASSIGN_TIMER_ID, payload}
}

export {
    TickTimer,
    ResetTimer,
    ApplyReward,
    UpdateActivityTickers,
    UpdateWorkers,
    AssignTimerId
}