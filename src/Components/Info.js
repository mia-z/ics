import React from 'react';
import { connect } from "react-redux";
import { Col, Row, Container, Button } from "react-bootstrap";
import "../styles/info.scss";

const mapStateToProps = (state) => { 
    return { 
        exploreStats: state.exploreStats,
        user: state.user
    }
}

export const Info = (props) => {
    return(
        <div>
            {Object.entries(props.exploreStats).map((item, key) => (
                <div key={key}>{item[0]}&nbsp;{item[1]}<br/></div>
            ))}
            {Object.entries(props.user.ores).map((item, key) => 
                <div key={key}>{item[0]}&nbsp;{item[1]}<br/></div>
            )}
            {Object.entries(props.user.wood).map((item, key) => 
                <div key={key}>{item[0]}&nbsp;{item[1]}<br/></div>
            )}
        </div>
    );
}

export default connect(mapStateToProps)(Info);