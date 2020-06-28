import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Col, Row, Container, Button } from "react-bootstrap";
import "../styles/housing.scss";

const mapStateToProps = (...state) => { 
    return { 
        currentActivity: state[0].currentActivity,
        currentExploreLocation: state[0].currentExploreLocation,
        exploreStats: state[0].exploreStats,
        user: state[0].user
    }
}

export const Housing = (props) => {
    return(
        <>
        housing
        </>
    );
}

export default connect(mapStateToProps)(Housing);