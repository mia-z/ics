import store from "./store";
import { ApplyReward } from "./Actions/Actions";


export const ExploreReward = (location, modifiers = null) => {
    store.dispatch(ApplyReward("Explore", { location: location }));
}