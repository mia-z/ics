import React from 'react';
import { connect } from "react-redux";
import "../styles/nav.scss";
import { GetIcons } from "../ImageRepo";
import "bootstrap/dist/css/bootstrap.css"
import NavButton from "./SubComponents/NavButton";

export const Navbar = (props) => {
    const icons = GetIcons(sections);
    return(
    <nav>
        {icons.map((name, index) => (
            <NavButton key={name.ImageName} currentUrl={props.routeParams.match.url} name={name.ImageName} imageUrl={name.ImageUrl}>
                {name.ImageName}
            </NavButton>
        ))}
    </nav>
    );
}

const sections = [ "Home", "Stats", "Housing", "Woodcutting", "Mining", "Explore" ];

export default connect()(Navbar);