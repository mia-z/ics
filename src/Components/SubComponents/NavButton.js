import React from "react";
import { Link } from "react-router-dom";

export const NavButton = ({currentUrl, name, ...props}) => {
    console.log(name, currentUrl);
    const imageUrl = `${process.env.PUBLIC_URL}/Assets/Icons/${name}.svg`;
    return(
        <Link className={`/${name}` === currentUrl ? "nav-button active" :`${name}` === "Home" && currentUrl === "/" ? "nav-button active" : "nav-button"}  to={`${name}`}>
            <img src={imageUrl} alt={name}/>
            <p>
                {props.children}
            </p>
        </Link>
    );
}

export default NavButton;