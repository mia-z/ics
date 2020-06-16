import React from 'react';
import { connect } from "react-redux";
import { IncrementNumber, DecrementNumber } from "./../Actions/Actions"

const mapStateToProps = state => { 
    return { count: state.count }
}

const mapDispatchToProps = {
    IncrementNumber, 
    DecrementNumber
}

const CounterElement = (props) => {
    return(
        <>
        <button onClick={props.IncrementNumber}>Increase</button> &nbsp;
        <button onClick={props.DecrementNumber}>Decrease</button> &nbsp;
        <p>Current Count: {props.count}</p>
        </>
    );
}

const Counter = connect(mapStateToProps, mapDispatchToProps)(CounterElement);

export default Counter;