import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.action";


import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selector";
import withRouter from "../withRouterComp";

import "./cart-dropdown.styles.scss";

const CartDropDown = ({ cartItems, history, dispatch, router }) => {
    console.log("history", router)
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                ) : (
                    <span className="empty-message"> Your cart is empty </span>
                )}
            </div>
            <CustomButton
                onClick={() => {
                    console.log(history)
                    router.navigate("/checkout");
                    dispatch(toggleCartHidden());
                }}
            >
                GO TO CHECKOUT
            </CustomButton>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});

export default connect(mapStateToProps)(withRouter(CartDropDown));
