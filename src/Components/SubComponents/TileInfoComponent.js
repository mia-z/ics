import React from "react";
import store from "./../../store";
import { batch } from "react-redux";
import { TileStates } from "../../Objects/Tile"
import { ResetActivityTimer, SetActivity, SetActivityParams, SetActivityThreshold, StartActivityTimer, StopActivityTimer, SetActivityDelegate, SetActivityDetails, } from "../../Actions/GlobalStateActions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        activity: state.GlobalState.activity,
        isRunning: state.GlobalState.activityIsRunning,
        params: state.GlobalState.activityParameters,
        tileInfo: state.ExplorationState.selectedTile
    }
}

const mapDispatchToProps = {
    SetActivity,
    SetActivityParams,
    StopActivityTimer,
    StartActivityTimer,
    SetActivityThreshold,
    ResetActivityTimer,
    SetActivityDelegate,
    SetActivityDetails,
}

export const TileInfoComponent = ({activity, isRunning, params, tileInfo, SetActivity, SetActivityParams, StartActivityTimer, SetActivityThreshold, SetActivityDelegate, SetActivityDetails, ResetActivityTimer, StopActivityTimer}) => {
    const IsExploringThisTile = () => {
        return params && params.x === tileInfo.x && params.y === tileInfo.y;
    }

    const HandleExploreClick = (location) => {
        if (activity === "Exploring" && isRunning && !IsExploringThisTile())
            return;

        if (IsExploringThisTile()) {
            return StopActivityTimer();
        }

        switch(location) {
            case "Grassland": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 100, location);
            case "Woodland": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 200, location);
            case "Tundra": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 350, location);
            case "Desert": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 600, location);
            case "Celestial": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 1200, location);
            default: return console.log("@@DEFAULT CASE HIT IN HANDLEEXPLORE, GAME WILL PROBABLY CRASH");
        }
    }

    const updateTimer = (activity, extra, reset, details) => {
        batch(() => {
            ResetActivityTimer();
            SetActivity(activity);
            SetActivityParams(extra);
            SetActivityThreshold(reset);
            SetActivityDetails(`${details} @ (${tileInfo.x}, ${tileInfo.y})`);
            SetActivityDelegate(() => store.dispatch(SetActivityDetails(`Idle`))); //TODO: Do I need this?
            StartActivityTimer();
        });
    }

    const SetClass = () => {
        let str = "";
        if (activity === "Exploring" && isRunning && !IsExploringThisTile()) str += "disabled ";
        if (activity === "Exploring" && isRunning) str += "red";
            else str += "blue";
        return str;
    }

    console.log(tileInfo);

    if (tileInfo) {
        switch (tileInfo.state) {
            case TileStates.UNEXPLORED:
                return (
                    <div className={"tile-info"}>
                        <div className="text medium">{tileInfo.state} - {tileInfo.biome}</div>
                            <button onClick={() => HandleExploreClick(tileInfo.biome)} className={SetClass()} >
                                <div className={"button-text"}>{
                                    activity === "Exploring" && isRunning && IsExploringThisTile() ? "Cancel" :
                                        activity === "Exploring" && isRunning && !IsExploringThisTile() ? "Exploring other tile!" :
                                            "Start Exploring"
                                }</div>
                            </button>

                        { activity === "Exploring" && isRunning && IsExploringThisTile() &&
                        <div className="progress-container">
                            <div className={"text center"}>Exploring...</div>
                        </div>
                        }
                    </div>
                );

            case TileStates.EXPLORED:
                return (
                    <div className={"tile-info"}>
                        <div className={"text medium center"}>{tileInfo.biome}</div>
                        <div className={"text"}>Available Resources:</div>
                        {tileInfo.gatheringNodes.map(nodes => (
                            <div key={nodes[0].name} className={"text center"}>
                                {nodes[0].name}:&nbsp;
                                {nodes.reduce((accumulator, item) => {
                                    return accumulator + item.health;
                                }, 0)}
                            </div>
                        ))}
                    </div>
                );

            default:
                return("you shouldnt EVER see this, im satisfying the ESLint");
        }
    } else
        return (
            <div className={"tile-info"}>
                <div className={"text medium"}>Select a tile above to see more info</div>
            </div>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(TileInfoComponent);

/*
Grassland
Woodland
Tundra
Desert
Celestial
*/