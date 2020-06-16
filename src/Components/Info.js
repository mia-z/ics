import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Col, Row, Container, Button } from "react-bootstrap";
import "../styles/info.scss";
import useInterval from '../Hooks/useTimeout';

const mapStateToProps = (...state) => { 
    return { 
        currentActivity: state[0].currentActivity,
        currentExploreLocation: state[0].currentExploreLocation,
        exploreStats: state[0].exploreStats
    }
}

export const Info = (props) => {
    const [eStats, setEStats] = useState(props.exploreStats);
    const p = props.exploreStats;
    useEffect(() => {
        setEStats(p);
    }, [p]);
    return(
        <div>
            {Object.entries(eStats).map((item, key) => (
                <div key={key}>{item[0]}&nbsp;{item[1]}<br/></div>
            ))}
        </div>
    );
}

export default connect(mapStateToProps)(Info);