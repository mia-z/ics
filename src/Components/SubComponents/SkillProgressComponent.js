import React from "react";
import connect from "react-redux/lib/connect/connect";
import { Line } from "rc-progress";
import { xpTable } from "../../Tools";

const percent = (value, total) => (value / total) * 100;

export const SkillProgressComponent = ({skill}) => {

    return(
        <div className={"skill-progress-container"}>
            <div className={"skill-progress-box"}>
                <div className={"name-section"}>
                    <div className={"skill-name"}>{skill.name}</div>
                </div>
                <div className={"level-section"}>
                    <div className={"skill-level"}>{skill.level}</div>
                </div>
                <div className={"xp-section"}>
                    <div className={"skill-xp"}>{skill.xp}</div>
                </div>
            </div>
            <div className={"progress-section"}>
                <div className={"skill-progress"}>
                    <div className={"skill-progress-text"}>
                        {skill.xp}/{xpTable[skill.level + 1]}
                    </div>
                    <Line
                        percent={percent(skill.xp - xpTable[skill.level], xpTable[skill.level + 1] - xpTable[skill.level])}
                        trailWidth="2"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeColor="#2ECC71"
                        trailColor="#E74C3C"
                    />
                </div>
            </div>
        </div>
    );
}

export default connect()(SkillProgressComponent);