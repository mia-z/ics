import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/nav.scss";
import { Col, Row } from "react-bootstrap";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"

const mapStateToProps = (...state) => {
    return {
        state: state[0]
    };
}

export const Navbar = (props) => {
    const [currentWindow, setCurrentWindow] = useState(props.routeParams.match.url);

    return(
    <nav>
        <Row className="p-1">
            <Col>
                <Button color={currentWindow === "/Home"  ? "primary" : "secondary"} 
                    tag={Link} to="/Home" block onClick={() => setCurrentWindow("/Home")}>Home</Button>
            </Col>
        </Row>
        <Row className="p-1">
            <Col>
                <Button color={currentWindow === "/Info" ? "primary" : "secondary"} tag={Link} to="/Info" block onClick={() => setCurrentWindow("/Info")}>Info</Button>
            </Col>
        </Row>
        <Row className="p-1">
            <Col>
                <Button color={currentWindow === "/Housing" ? "primary" : "secondary"} tag={Link} to="/Housing" block onClick={() => setCurrentWindow("/Housing")}>Housing</Button>
            </Col>
        </Row>
        <Row className="p-1"> 
            <Col>
                <Button color={currentWindow === "/Woodcutting" ? "primary" : "secondary"} tag={Link} to="/Woodcutting" block onClick={() => setCurrentWindow("/Woodcutting")}>Woodcutting</Button>
            </Col>
        </Row>
        <Row className="p-1"> 
            <Col>
                <Button color={currentWindow === "/Mining" ? "primary" : "secondary"} tag={Link} to="/Mining" block onClick={() => setCurrentWindow("/Mining")}>Mining</Button>
            </Col>
        </Row>
        <Row className="p-1"> 
            <Col>
                <Button color={currentWindow === "/Explore" ? "primary" : "secondary"} tag={Link} to="/Explore" block onClick={() => setCurrentWindow("/Explore")}>Explore</Button>
            </Col>
        </Row>
    </nav>
    );
}

export default connect(mapStateToProps)(Navbar);