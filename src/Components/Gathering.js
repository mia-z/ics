import React, { useState } from 'react';
import { connect, batch } from "react-redux";
import { SetActivity, SetActivityParams, StopActivityTimer, SetActivityThreshold, StartActivityTimer, ResetActivityTimer, SetActivityDetails, SetActivityDelegate } from "../Actions/GlobalStateActions";
import { UpdateCurrentGatheringNodeCoords, UpdateGatheringNode } from "../Actions/ExplorationStateActions";
import { GetImages } from "../ImageRepo";
import "../styles/Gathering.scss";
import { TileStates } from "../Objects/Tile";
import NodeContainer from "./SubComponents/NodeContainer";

const mapStateToProps = (state) => { 
    return { 
        activity: state.GlobalState.activity,
        activityParameters: state.GlobalState.activityParameters,
        tile: state.ExplorationState.selectedTile,
    }
}

const mapDispatchToProps = {
    SetActivity,
    SetActivityParams,
    StopActivityTimer,
    StartActivityTimer,
    SetActivityThreshold,
    ResetActivityTimer,
    SetActivityDetails,
    SetActivityDelegate,
    UpdateCurrentGatheringNodeCoords,
    UpdateGatheringNode,
}

export const Gathering = (props) => {
    //const images = GetImages("Gathering");

    const HandleClick = (nodeName, arrayIndex, reset, outerArrayIndex) => {
        if (props.activity === "Gathering" && props.activityParameters.name === nodeName) {
            props.StopActivityTimer();
            props.SetActivityDetails("Idle");
            return;
        }
        batch(() => {
            props.UpdateCurrentGatheringNodeCoords(props.tile.x, props.tile.y);
            props.SetActivity("Gathering");
            props.ResetActivityTimer();
            props.SetActivityParams({
                name: nodeName,
                tileX: props.tile.x,
                tileY: props.tile.y,
                outerArrayIndex: outerArrayIndex,
                arrayIndex: arrayIndex,
                ...props.activityParameters
            });
            props.SetActivityDetails(nodeName);
            props.SetActivityThreshold(reset);
            props.StartActivityTimer();
        });
    }

   if (props.tile && props.tile.state === TileStates.EXPLORED)
        return(
            <div className={"game-view-container"}>
                {props.tile.gatheringNodes.map((array, index) => (
                    <NodeContainer key={`root-node-container-${index}`} type={array[0].type} nodeArray={array} outerArrayIndex={index} handleClick={HandleClick} />
                ))}
            </div>
        );
   else if (props.tile && props.tile.state === TileStates.UNEXPLORED)
        return(
            <div className={"game-view-container"}>
                <div className={"box"}>
                    You must explore the tile first!
                </div>
            </div>
        );
    else return(
        <div className={"game-view-container"}>
            <div className={"box"}>
                You gotta select a tile first!
            </div>
        </div>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(Gathering);