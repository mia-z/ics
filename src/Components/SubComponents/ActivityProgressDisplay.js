import React from "react";
import { connect } from "react-redux";
import "../../styles/activityprogressdisplay.scss"
import { Line } from "rc-progress";

const mapStateToProps = (state) => {
    return {
        activity: state.GlobalState.activity,
        tick: state.GlobalState.activityTick,
        resetTick: state.GlobalState.activityReset,
        details: state.GlobalState.activityDetails
    }
}

const percent = (value, total) => (value / total) * 100;

export const ActivityProgressDisplay = ({tick, resetTick, activity, details}) => {
    return(
        <div className={"activity-progress-display"}>
            <div>
                Current Activity:
            </div>
            <div>
                {activity}
            </div>
            <div>
                {details}
            </div>
            <div>
                <Line percent={percent(tick, resetTick)} trailWidth="5" strokeWidth="5" strokeLinecap="round" strokeColor="#3b6978" />
            </div>
        </div>
    );
}

export default connect(mapStateToProps, null)(ActivityProgressDisplay);