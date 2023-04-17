import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import withRouter from "../withRouterComp";
import "./menu-item.styles.scss";

const MenuItem = ({ key, title, imageUrl, size, linkUrl }) => {
    const history = useNavigate();
    const match = useLocation();

    return (
        <div
            className={`${size} menu-item`}
            onClick={() => history(`${match.pathname}${linkUrl}`)}
        >
            <div
                className="background-image"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    );
};

export default withRouter(MenuItem);
