import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectCartTotal } from "../../redux/cart/cart.selector";
import { getPromoItem } from "../../redux/admin/admin.util";
import { setPromoList } from "../../redux/admin/admin.action";
import { selectPromotionAmount } from "../../redux/admin/admin.selector";

import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import "./checkout-summary.styles.scss";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const CheckOutSummary = ({ setPromoList, couponCode, total, discountTotal }) => {
    let handleSubmit = event => {
        try {
            if (couponCode) {
                new Promise((resolve, reject) => {
                    getPromoItem(couponCode).then((response) => {
                        setPromoList(response);
                        resolve(response);
                    });
                });
            }

        } catch (error) {
            console.error("Error : ", error);
        }
    };
    let handleChange = event => {
    };

    return (
        <div>
            <div className="checkout-summary">
                <div className="summary-header">Order Summary</div>
                <div className="summary-item">
                    <span className="item-text">Subtotal</span>
                    <span className="item-amount">&#2547;<span className="amount">{total}</span></span>
                </div>
                <div className="summary-item">
                    <span className="item-text">Discount</span>
                    <span className="item-amount">&#2547; <span className="amount">{discountTotal}</span></span>
                </div>
                <div className="summary-item">
                    <span className="item-text">Shipping charge</span>
                    <span className="item-amount">&#2547; <span className="amount">200</span></span>
                </div>
                <div className="summary-item">
                    <span className="item-text">Wallet Debit</span>
                    <span className="item-amount">&#2547;<span className="amount">{total}</span></span>
                </div>
                <div className="input-section">

                    <InputGroup >
                        <Form.Control
                            className="input-group"
                            placeholder="Type your code"
                            aria-label="Type coupon code"
                            aria-describedby="basic-addon2"
                            name="couponCode"
                            onChange={handleChange}
                        />
                        <Button className="apply-button" variant="outline-secondary" onClick={handleSubmit}>Apply</Button>
                    </InputGroup>
                </div>
                <div className="input-section wallet-balance">

                    <div className="summary-item col-md-12">
                        <span className="item-text">Wallet Balance: 560 Taka</span>
                    </div>
                    <InputGroup >
                        <Form.Control
                            className="input-group"
                            placeholder="Amount"
                            aria-label="Amount"
                            aria-describedby="basic-addon2"

                        />
                        <Button className="apply-button" variant="outline-secondary">Use Wallet</Button>
                    </InputGroup>
                </div>
                <div className="summary-item">
                    <span className="item-text">Total Payable</span>
                    <span className="item-amount">&#2547;<span className="amount">{total - discountTotal}</span></span>
                </div>

            </div>
            <div className="test-warning">
                Please use the following test credit card for payments
                <br />
                4242 4242 4242 4242 - Exp: 12/20 - CVV : 123
            </div>
            <StripeCheckoutButton price={total - discountTotal} couponCode={couponCode || ""} />
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    discountTotal: selectPromotionAmount,
    total: selectCartTotal
});

const mapDispatchToProps = dispatch => ({
    setPromoList: promotions => dispatch(setPromoList(promotions))
})


export default connect(mapStateToProps, mapDispatchToProps)(CheckOutSummary);
