import { connect } from "react-redux";
import Node from "./Node";
import React from "react";
import { SetActivityParams } from "../../Actions/GlobalStateActions";

const mapStateToProps = (state) => {
    return {
        activityParameters: state.GlobalState.activityParameters
    }
}

const mapDispatchToProps = {
    SetActivityParams,
}

const NodeContainer = ({type, nodeArray, handleClick, outerArrayIndex, activityParameters, SetActivityParams}) => {
    const TitleClass = () => `${type.toLowerCase()}-title`;
    const ContainerClass = () => `${type.toLowerCase()}-node-container`;

    const HandleChecked = (event, name) => {
        if (event.currentTarget.checked) {
            SetActivityParams({...activityParameters, name: name,  continue: true});
        }
        else {
            SetActivityParams({...activityParameters, continue: false});
        }
    }

    return(
        <div className={"node-container"}>
            <div className={TitleClass()}>
                <div className={"node-container-title-text"}>
                    {nodeArray[0].name}
                </div>
                <div className={"node-container-check"}>
                    <label>Continue gathering available nodes&nbsp;<input checked={activityParameters.continue && activityParameters.name === nodeArray[0].name} type={"checkbox"} onChange={e => HandleChecked(e, nodeArray[0].name)}/></label>
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

export default connect(mapStateToProps, mapDispatchToProps)(NodeContainer);