import React, { useState } from "react";
import { TileStates } from "../../Objects/Tile"

export const TileComponent = (props) => {
    const [mouseOver, setMouseOver] = useState(false);
    const initialStyle = {
        height: "40px",
        width: "40px",
        transition: "0.1s"
    }; 
    
    const SetStyle = () => {
        if (mouseOver) {
            if (props.selected) return {...initialStyle, backgroundColor: "#8bd6f2"};
            switch(props.state) {
                case TileStates.UNAVAILABLE: return {...initialStyle, backgroundColor: "none"};
                case TileStates.CONTROLLED: return {...initialStyle, backgroundColor: "#85e085"};
                case TileStates.UNEXPLORED: return {...initialStyle, backgroundColor: "#ff7871"};
                case TileStates.EXPLORED: return {...initialStyle, backgroundColor: "#ff8c62"};
                default: return {...initialStyle, backgroundColor: "whitesmoke"};
            }
        }
        if(!mouseOver) {
            if (props.selected) return {...initialStyle, backgroundColor: "#aee2f6"};
            switch(props.state) {
                case TileStates.UNAVAILABLE: return {...initialStyle, backgroundColor: "none"};
                case TileStates.CONTROLLED: return {...initialStyle, backgroundColor: "#77dd77"};
                case TileStates.UNEXPLORED: return {...initialStyle, backgroundColor: "#ff6961"};
                case TileStates.EXPLORED: return {...initialStyle, backgroundColor: "#ff7f50"};
                default: return {...initialStyle, backgroundColor: "white"};
            }
        }
    }

    return(
        <div style={SetStyle()} 
            onClick={() => props.click(props.coords.x, props.coords.y)}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >

        </div>
    );
}

export default TileComponent;

/*
https://maketintsandshades.com/#77DD77,FF7F50,8bd6f2,ff6961
Tile colour codes(lighter, normal, darker)
SELECTED, Dark Pastel Blue (#aee2f6, #8bd6f2, #7dc1da )
UNEXPLORED, Pastel Red (#ff9690, #ff6961 #e65f57)
EXPLORED, Coral (#ffa585, #ff7f50 #e67248)
CONTROLLED, Pastel Green (#a0e7a0, #77dd77 #6bc76b)
*/