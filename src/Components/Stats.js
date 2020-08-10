import React from 'react';
import { connect } from "react-redux";
import { Col, Row, Container, Button } from "react-bootstrap";
import "../styles/stats.scss";

const mapStateToProps = (state) => { 
    return { 
        exploreStats: state.GlobalState.exploreStats,
        user: state.GlobalState.user
    }
}

export const Stats = ({user, exploreStats}) => { //This can probably updated or automated in the future
    return(
        <>

        </>
    );
}

export default connect(mapStateToProps)(Stats);