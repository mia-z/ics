import React from 'react';
import { connect } from "react-redux";

const mapDispatchToProps = {

}

export const InventoryItem = ({item, sendTileInfo}) => {
    const handleMouseOver = e => {
        sendTileInfo(e.target.offsetLeft-2, e.target.offsetTop+32, item.Name);
    }

    const handleMouseLeave = () => {
        console.log("Hiding");
        sendTileInfo(0, 0, "__LEAVE__");
    }
    return(
        <div className={"inventory-tile"} onMouseEnter={e => handleMouseOver(e)} onMouseLeave={() => handleMouseLeave()}>
            <img className={"item-img"} src={"https://placeholder.pics/svg/55x60/4AFF29-92B9FF"}  alt={"inventory image"}/>
            <div className={"item-amount"}>
                {item.Amount}
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(InventoryItem);
