import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Col, Row, Container, Button } from "react-bootstrap";
import "../styles/info.scss";
import useInterval from '../Hooks/useTimeout';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

const mapStateToProps = (...state) => { 
    return { 
        currentActivity: state[0].currentActivity,
        currentExploreLocation: state[0].currentExploreLocation,
        exploreStats: state[0].exploreStats,
        user: state[0].user
    }
}

export const Info = (props) => {
    const [eStats, setEStats] = useState(props.exploreStats);
    const [user, setUser] = useState(props.user);        

    useEffect(() => {
        setEStats(props.exploreStats);
        setUser(props.user)
        console.log(props.user);
    }, [props.user, props.exploreStats]);

    return(
        <div>
            {Object.entries(eStats).map((item, key) => (
                <div key={key}>{item[0]}&nbsp;{item[1]}<br/></div>
            ))}
            <div>
            {Object.entries(user.ores).map((item, key) => 
                <div key={key}>{item[0]}&nbsp;{item[1]}<br/></div>
            )}
        </div>
        </div>
    );
}

export default connect(mapStateToProps)(Info);