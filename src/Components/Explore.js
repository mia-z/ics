import React from 'react';
import { connect } from "react-redux";
import { UpdateActivityTickers } from "./../Actions/GlobalStateActions";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Line } from "rc-progress";
import "../styles/explore.scss";
import Timer from "../Objects/Timer";

const Explore = (props) => {

    return(
        <>
        <h3>Explore new areas</h3>
        <h4>Currently exploring: {props.exploreTicker.extra}</h4>

        </>
    );
}

export default Explore;

