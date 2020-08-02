import { connect } from "react-redux";
import Node from "./Node";
import React from "react";

const mapStateToProps = (state) => {
    return {
        activityTimer: state.GlobalState.activityTimer,
        tile: state.ExplorationState.selectedTile
    }
}

const NodeContainer = ({type, nodeArray, handleClick, outerArrayIndex}) => {
    const TitleClass = () => `${type.toLowerCase()}-title`;
    const ContainerClass = () => `${type.toLowerCase()}-node-container`;

    return(
        <div className={"node-container"}>
            <div className={TitleClass()}>
                <div className={"node-container-title-text"}>
                    {nodeArray[0].name}
                </div>
                <div className={"node-container-check"}>
                    <label>Continue gathering available nodes&nbsp;<input type={"checkbox"}/></label>
                </div>
            </div>
            <div className={ContainerClass()}>
                {nodeArray.map((item, index) => (
                    <Node key={`${type}-node-container-${index}`} index={index} nodeProps={item} handleClick={handleClick} outerArrayIndex={outerArrayIndex}/>
                ))}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, null)(NodeContainer);