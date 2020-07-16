import React, { useState } from "react";
import { TileStates } from "../../Objects/Tile"

export const TileComponent = (props) => {
    const [mouseOver, setMouseOver] = useState(false);

    let initialStyle = {
        height: "40px",
        width: "40px",
        transition: "0.1s"
    }

    const animateSelected = (selected) => selected ? "animate-selected" : "";

    const SetStyle = () => {
        if (mouseOver) {
            switch(props.state) {
                case TileStates.UNAVAILABLE: return {...initialStyle, backgroundColor: "none"};
                case TileStates.CONTROLLED: return {...initialStyle, backgroundColor: "#c9f1c9"};
                case TileStates.UNEXPLORED: return {...initialStyle, backgroundColor: "#ff8f66", filter: "none"};
                case TileStates.EXPLORED: return {...initialStyle, backgroundColor: "#478547", filter: "none"};
                default: return {...initialStyle, backgroundColor: "whitesmoke", filter: "none"};
            }
        }
        if(!mouseOver) {
            switch(props.state) {
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
            className={animateSelected(props.selected)}
            onClick={() => props.click(props.coords.x, props.coords.y)}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >

        </div>
    );
}

export default TileComponent;