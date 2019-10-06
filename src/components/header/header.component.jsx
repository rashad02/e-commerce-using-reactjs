import React from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {auth} from "../../firebase/firebase.util";
import {connect} from 'react-redux';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component"

import './header.styles.scss';

const Header = ({currentUser, hidden}) => {
    return (
        <div className="header">
            <Link to="/" className="logo-container">
                <Logo className="logo"/>
            </Link>
            <div className="options">
            <Link to="/shop" className="option">SHOP</Link>
            <Link to="/contact" className="option">CONTACT</Link>
            {
                currentUser ? <div className="option" onClick={()=> auth.signOut()}>SIGN OUT</div> :
                <Link to= "/signin" className="option"> SIGN IN </Link> 
            }
            <CartIcon />
            </div>
            {hidden ? null : <CartDropDown />} 
        </div>
    )
}

const mapStateToProps = ({ user: {currentUser},cart: {hidden} }) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);