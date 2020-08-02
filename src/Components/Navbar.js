import React from 'react';
import { connect } from "react-redux";
import "../styles/nav.scss";
import { GetSvg, GetImages } from "../ImageRepo";
import "bootstrap/dist/css/bootstrap.css"
import NavButton from "./SubComponents/NavButton";

export const Navbar = (props) => {
    const icons = GetImages(sections);
    return(
    <nav>
        {icons.map((name, index) => (
            <NavButton key={index} currentUrl={props.routeParams.match.url} name={name.ImageName} imageUrl={name.ImageUrl}>
                {name.ImageName}
            </NavButton>
        ))}
    </nav>
    );
}

const sections = [ "Home", "Stats", "Inventory", "Exploration", "Gathering" ];

export default connect()(Navbar);