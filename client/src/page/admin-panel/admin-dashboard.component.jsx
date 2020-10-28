import React from "react";
import { Route, withRouter } from 'react-router-dom';

import {Container, Row, Col} from "react-bootstrap";
import Sidebar from "../../components/admin-panel/sidebar/sidebar.components";
import AddPromo from "../../components/admin-panel/promotion/add-promo.component";
import PromoList from "../../components/admin-panel/promotion/promo-code.component";
import OrderPage from "../../components/admin-panel/order/orders.component";

import './admin-dashboard.scss';

const Dash = ({match}) => {

 
    return (
        <>
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col  xs={10}>
                    <Route exact path ={`${match.path}`} component={PromoList}/>
                    <Route path ={`${match.path}/addpromo`} component={AddPromo}/>
                    <Route path ={`${match.path}/orders`} component={OrderPage}/>
                    </Col> 
                </Row>
                

            </Container>
        </>
        );
  };
const Dashboard = withRouter(Dash);
  export default Dashboard