import React from "react";
// import { Routes, Route } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/admin-panel/sidebar/sidebar.components";
import AddPromo from "../../components/admin-panel/promotion/add-promo.component";
import PromoList from "../../components/admin-panel/promotion/promo-code.component";
import OrderPage from "../../components/admin-panel/order/orders.component";
import withRouter from "../../components/withRouterComp";

import "./admin-dashboard.scss";

const Dashboard = ({ router }) => {
    console.log("aaa", router);
    const { location } = router;
    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10}>
                        {location.pathname === '/admin/addpromo/' ? <AddPromo /> : location.pathname === '/admin/orders' ? <OrderPage /> : <PromoList />}
                    </Col>
                </Row>
            </Container>
        </>
    );
};
// const  = withRouter(Dash);
export default withRouter(Dashboard);
