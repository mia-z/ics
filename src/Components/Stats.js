import React from 'react';
import { connect } from "react-redux";
import { Line } from "rc-progress";
import "../styles/stats.scss";
import {SkillProgressComponent} from "./SubComponents/SkillProgressComponent";

const mapStateToProps = (state) => { 
    return { 
        mining: state.Skills.Mining,
        woodcutting: state.Skills.Woodcutting
    }
}

export const Stats = ({mining, woodcutting}) => {
    return(
        <div className={"game-view-container"}>
            <SkillProgressComponent skill={mining}/>
            <SkillProgressComponent skill={woodcutting}/>
        </div>
    );
}

export default connect(mapStateToProps, null)(Stats);