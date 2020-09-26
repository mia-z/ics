import React from 'react';
import { connect } from "react-redux";
import "../styles/inventory.scss";

const mapStateToProps = (state) => {
    return {
        items: state.Inventory.Items
    }
}

const mapDispatchToProps = {

}

export const Inventory = ({items}) => {

    return(
        <>
            {
                items.map((item, index) => (
                    <div key={index}>{`${item.Name}: ${item.Amount}`}</div>
                ))
            }
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);