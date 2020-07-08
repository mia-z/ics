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
            <div className="info-box">
                <Row className="justify-content-center">
                    <Col md={4}>
                        <h3 className="text-center">Ores</h3>
                    </Col>
                </Row>
                <Row>
                    {Object.entries(user.ores).map((item, key) =>
                        <Col key={key}>
                            <div>{item[0]}&nbsp;{item[1]}</div>
                        </Col>
                    )}
                </Row>
            </div>

            <div className="info-box">
                <Row className="justify-content-center">
                    <Col md={4}>
                        <h3 className="text-center">Wood</h3>
                    </Col>
                </Row>
                <Row>
                    {Object.entries(user.wood).map((item, key) =>
                        <Col key={key}>
                            <div>{item[0]}&nbsp;{item[1]}</div>
                        </Col>
                    )}

                </Row>
            </div>

            <div className="info-box">
                <Row className="justify-content-center">
                    <Col md={4}>
                        <h3 className="text-center">Explore stats</h3>
                    </Col>
                </Row>
                <Row>
                    {Object.entries(exploreStats).map((item, key) =>
                        <Col key={key}>
                            <div>{item[0]}&nbsp;{item[1]}</div>
                        </Col>
                    )}

                </Row>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(Stats);