import React from 'react';
import { connect } from "react-redux";
import "../styles/status.scss";

const mapStateToProps = state => { 
    return { currentActivity: state.currentActivity }
}

const StatusComponent = (props) => {
    return(
        <div>
            &nbsp;
        </div>
    );
}

export const Status = connect(mapStateToProps)(StatusComponent)

export default Status;