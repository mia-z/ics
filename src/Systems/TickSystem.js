import store from "./../store";
import { TickGlobalTimer, ResetGlobalTimer, TickActivityTimer, SetActivity, ResetActivityTimer } from "./../Actions/GlobalStateActions";
import { ExploreTile } from "../Actions/ExplorationStateActions";
import { RewardBroker } from "./../RewardBroker";

export const TickSystem = () => {
    let state = store.getState().GlobalState;
    if (state.activityTimer.isRunning) {
        store.dispatch(TickGlobalTimer());
        if (state.activityTimer.tick >= state.activityTimer.resetTick) {
            //console.log(timer.extra);
            RewardBroker(state.activityTimer.activity, { modifiers: { ...state.activityTimer } });
            if (state.activityTimer.activity === "Explore") {
                state.activityTimer.onDoneDelegate();
                return false;
            }
            return store.dispatch(ResetActivityTimer());
        } else store.dispatch(TickActivityTimer());
        //console.log("ticking in main");
        if (state.globalTimer.tick >= 100) {
            store.dispatch(ResetGlobalTimer());
            //console.log("completed this round of tick", state.activityTickers);
        }
    }
}

export default TickSystem;