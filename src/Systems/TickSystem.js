import store from "./../store";
import { TickGlobalTimer, ResetGlobalTimer, TickActivityTimer, ResetActivityTimer, StopActivityTimer, SetActivityParams } from "../Actions/GlobalStateActions";
import { ExploreTile, UpdateGatheringNode } from "../Actions/ExplorationStateActions";
import { AddItem } from "../Actions/InventoryActions";
import { GetItemFromNode } from "../ItemRepo";

export const TickSystem = () => {
    let state = store.getState().GlobalState;
    if (state.activityIsRunning) {
        store.dispatch(TickGlobalTimer());
        if (state.activityTick >= state.activityReset) {
            //console.log(timer.extra);
            RewardBroker(state.activity, state.activityParameters);
            switch (state.activity) {
                case "Exploring":
                    store.dispatch(ExploreTile(state.activityParameters.x, state.activityParameters.y));
                    return store.dispatch(StopActivityTimer());
                case "Gathering":
                    store.dispatch(UpdateGatheringNode(state.activityParameters.tileX, state.activityParameters.tileY,1, state.activityParameters.arrayIndex, state.activityParameters.outerArrayIndex))
                    let gatheringProps = store.getState().ExplorationState.selectedTile.gatheringNodes;
                    if (gatheringProps[state.activityParameters.outerArrayIndex][state.activityParameters.arrayIndex].health < 1) {
                        if (state.activityParameters.continue) { //look for available node, starting at index 0
                            for (let x = 0; x < gatheringProps[state.activityParameters.outerArrayIndex].length; x++) {
                                if (gatheringProps[state.activityParameters.outerArrayIndex][x].health > 0) {
                                    store.dispatch(SetActivityParams({...state.activityParameters, arrayIndex: x}));
                                    break;
                                }
                                if (x === gatheringProps[state.activityParameters.outerArrayIndex].length - 1)
                                    store.dispatch(StopActivityTimer());
                            }
                        } else
                            store.dispatch(StopActivityTimer());
                    }
                    console.log(gatheringProps);
                    break;
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

const RewardBroker = (activity, params) => {
    switch(activity) {
        case "Gathering":
            let item = GetItemFromNode(params.name);
            return store.dispatch(AddItem(item));
    }
}

export default TickSystem;