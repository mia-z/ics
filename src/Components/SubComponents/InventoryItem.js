import React from 'react';
import { connect } from "react-redux";
import { GetItemIcon } from "../../ImageRepo";

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

    const imageData = GetItemIcon(item.Name);

    return(
        <div className={"inventory-tile"} onMouseEnter={e => handleMouseOver(e)} onMouseLeave={() => handleMouseLeave()}>
            {/*<img className={"item-img"} src={"https://placeholder.pics/svg/55x60/4AFF29-92B9FF"}  alt={"inventory image"}/>*/}
            <img className={"item-img"} src={item.ImageUrl}  alt={item.Name}/>
            <div className={"item-amount"}>
                {item.Amount}
            </div>
        </div>
    );
}

export default connect(null, mapDispatchToProps)(InventoryItem);
