import React from 'react';
import { Link } from "react-router-dom";

export const Header = () => {
    return(
        <nav>
            <Link to="/">Home</Link> &nbsp;
            <Link to="/Info">Info</Link> &nbsp;
            <Link to="/Explore">Explore</Link> &nbsp;
        </nav>
    );
}

export default Header;