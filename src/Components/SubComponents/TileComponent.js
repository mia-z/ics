import React, { useState } from "react";
import { TileStates } from "../../Objects/Tile"
import { Circle } from 'rc-progress';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        params: state.GlobalState.activityParameters,
        tick: state.GlobalState.activityTick,
        reset: state.GlobalState.activityReset
    }
}

const mapDispatchToProps = {

}

export const TileComponent = ({params, tick, reset, state, selected, coords, click}) => {
    const [mouseOver, setMouseOver] = useState(false);

    let initialStyle = {
        height: "40px",
        width: "40px",
        transition: "0.1s"
    }

    const percent = (current, max) => (current / max) * 100;

    const animateSelected = (selected) => selected ? "animate-selected" : "";

    const SetStyle = () => {
        if (mouseOver) {
            switch(state) {
                case TileStates.UNAVAILABLE: return {...initialStyle, backgroundColor: "none"};
                case TileStates.CONTROLLED: return {...initialStyle, backgroundColor: "#c9f1c9"};
                case TileStates.UNEXPLORED: return {...initialStyle, backgroundColor: "#ff8f66", filter: "none"};
                case TileStates.EXPLORED: return {...initialStyle, backgroundColor: "#478547", filter: "none"};
                default: return {...initialStyle, backgroundColor: "whitesmoke", filter: "none"};
            }
        }
        if(!mouseOver) {
            switch(state) {
                case TileStates.UNAVAILABLE: return {...initialStyle, backgroundColor: "none"};
                case TileStates.CONTROLLED: return {...initialStyle, backgroundColor: "#77dd77"};
                case TileStates.UNEXPLORED: return {...initialStyle, backgroundColor: "#ff4500"};
                case TileStates.EXPLORED: return {...initialStyle, backgroundColor: "#305830"};
                default: return {...initialStyle, backgroundColor: "white"};
            }
        }
    }

    return(
        <div style={SetStyle()}
            className={animateSelected(selected)}
            onClick={() => click(coords.x, coords.y)}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            {params && params.x=== coords.x && params.y === coords.y &&
                <Circle percent={percent(tick, reset)} strokeWidth="20" strokeColor="#333"/>
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TileComponent);