import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import "../styles/inventory.scss";
import InventoryItem from "./SubComponents/InventoryItem";

const mapStateToProps = (state) => {
    return {
        items: state.Inventory.Items
    }
}

const mapDispatchToProps = {

}

const initialMouseoverStyle = {
    position: "absolute",
    minHeight: 20+"px",
    width: 90+"px",
    zIndex: "9999",
    top: 0,
    left: 0,
    backgroundColor: "#3f3f3f",
    borderRadius: 20+"px",
    text: "",
    textAlign: "center",
    padding: 2+"px "+4+"px",
    display: "none"
}

export const Inventory = ({items}) => {
    const [mouseOver, setMouseOver] = useState(initialMouseoverStyle);

    const getTileInfo = (tileX, tileY, name) => {
        if (name === "__LEAVE__")
            setMouseOver({...mouseOver, display: "none"});
        else
            setMouseOver({...mouseOver, left: tileX, top: tileY, text: name, display: "block"});
    }

    return(
        <div className={"game-view-container"}>
            <div className={"inventory-container"}>
                <div className={"inventory-stats"}>
                    <div className={"inventory-stats-title"}>
                        Misc. Inventory Stats
                    </div>
                    <div className={"inventory-stats-content"}>

                    </div>
                </div>
                <div className={"inventory-equipment"}>
                    <div className={"inventory-equipment-title"}>
                        Equipment
                    </div>
                    <div className={"inventory-equipment-content"}>

                    </div>
                </div>
                <div className={"inventory-bag"}>
                    <div className={"inventory-bag-title"}>
                        Inventory Items
                    </div>
                    <div className={"inventory-bag-content"}>
                        {items.map((item, index) => (
                            <InventoryItem key={index} item={item} sendTileInfo={getTileInfo} />
                        ))}
                    </div>
                </div>
                <div className={"inventory-mouseover"} style={mouseOver}>
                    <p>
                        {mouseOver.text}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
