import React from "react";
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { Nav } from "react-bootstrap";
import { createStructuredSelector } from "reselect";

import { showPromotionChildNode } from "../../../redux/admin/admin.action";
import { selectPromotionChildNode } from "../../../redux/admin/admin.selector";

import './sidebar.styles.scss';

const Sidebar = ({ showPromotionChildNode, childNode, match }) => {

    const handleSubmit = (event) => {


        let clickedValue = event;

        if ((clickedValue === 'promotions' && !childNode) || (clickedValue === 'orders' && childNode)) {
            showPromotionChildNode()
        }

    }

    return (
        <div>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/home"
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item onClick={() => handleSubmit('promotions')} className="options">
                    <Link to={`/admin`} className="option">Promotion</Link>
                    {childNode ? <div className="child-nav"><Link to={`/admin`} className="option">Promo Code</Link>
                        <Link to={`/admin/addpromo`} className="option"> Add Promo Code </Link></div> : ""}
                </Nav.Item>
                <Nav.Item onClick={() => handleSubmit('orders')} className="options">
                    <Link to='/admin/orders' className="option"> Orders</Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}



const mapDispatchToProps = dispatch => ({
    showPromotionChildNode: () => dispatch(showPromotionChildNode()),
})


const mapStateToProps = createStructuredSelector({
    childNode: selectPromotionChildNode
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)