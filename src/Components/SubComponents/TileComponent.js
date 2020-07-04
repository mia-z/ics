import React, { useState } from "react";

export const TileComponent = (props) => {
    const [mouseOver, setMouseOver] = useState(false);
    const initialStyle = {
        height: "40px",
        width: "40px",
        transition: "0.1s"
    }; 
    
    const SetStyle = () => {
        if (mouseOver) {
            if (props.selected) return {...initialStyle, backgroundColor: "lightblue"};
            switch(props.state) {
                case "UNAVAILABLE": return {...initialStyle, backgroundColor: "none"};
                case "PURCHASED": return {...initialStyle, backgroundColor: "lightgreen"};
                case "UNPURCHASED": return {...initialStyle, backgroundColor: "yellow"};
                default: return {...initialStyle, backgroundColor: "whitesmoke"};
            }
        }
        if(!mouseOver) {
            if (props.selected) return {...initialStyle, backgroundColor: "blue"};
            switch(props.state) {
                case "UNAVAILABLE": return {...initialStyle, backgroundColor: "none"};
                case "PURCHASED": return {...initialStyle, backgroundColor: "green"};
                case "UNPURCHASED": return {...initialStyle, backgroundColor: "yellowgreen"};
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