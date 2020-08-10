import React, { useState } from "react";
import { TileStates } from "../../Objects/Tile"
import { Circle } from 'rc-progress';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        params: state.GlobalState.activityParameters,
        tick: state.GlobalState.activityTick,
        reset: state.GlobalState.activityReset,
        selectedTile: state.ExplorationState.selectedTileCoords
    }
}


export const TileComponent = ({params, tick, reset, state, coords, click, selectedTile}) => {

    const percent = (current, max) => (current / max) * 100;

    const isSelected = () => selectedTile.x === coords.x && selectedTile.y === coords.y ? "animate" : "";

    const GetStateStyle = () => {
        switch(state) {
            case TileStates.UNAVAILABLE: return "unavailable";
            case TileStates.UNEXPLORED: return "unexplored";
            case TileStates.EXPLORED: return "explored";
            default: return "";
        }
    }

    return(
        <div className={`tile ${GetStateStyle()} ${isSelected()}`}
            onClick={() => click(coords.x, coords.y)}>
            {params && params.x=== coords.x && params.y === coords.y &&
                <Circle percent={percent(tick, reset)} strokeWidth="20" strokeColor="#333"/>
            }
        </div>
    );
}

export default connect(mapStateToProps, null)(TileComponent);