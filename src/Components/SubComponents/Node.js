import { connect } from "react-redux";
import React from "react";

const mapStateToProps = (state) => {
    return {
        params: state.GlobalState.activityParameters,
        tile: state.ExplorationState.selectedTile,
    }
}

const Node = ({nodeProps, index, params, tile, handleClick, outerArrayIndex}) => {
    const GetIcon = (type) => {
        switch (type) {
            case "Mining": return `${process.env.PUBLIC_URL}/Assets/OreRock.png`;
            case "Woodcutting": return `${process.env.PUBLIC_URL}/Assets/Oak.svg`;
            default: return console.log(`@@ERROR AT GETICON IN NODE ${tile.x},${tile.y} - DIDNT GET AN ICON - TYPE: ${type} WAS GIVEN`);
        }
    }

    return(
        <div className={!params ? "node-item" : params.arrayIndex === index && params.name === nodeProps.name ? "node-item active" : "node-item"}
             style={{background: `url("${process.env.PUBLIC_URL}/Assets/${tile.biome}.svg") no-repeat`}}
             onClick={() => handleClick(nodeProps.name, index, nodeProps.resetTick, outerArrayIndex)}
            >

            <img src={GetIcon(nodeProps.type)} />
            <div className={"overlay"}>
                {nodeProps.health}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, null)(Node);

