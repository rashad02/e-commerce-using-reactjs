import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {auth, createUserProfileDocument} from "./firebase/firebase.util";
import {connect} from "react-redux";
import {selectCurrentUser} from "./redux/user/user.selector";
import {createStructuredSelector} from "reselect";

import HomePage from './page/homepage/homepage.component';
import ShopPage from "./page/shop-page/shop-page.component";
import Header from "./components/header/header.component";
import Checkout from "./page/checkout/checkout.component";
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {setCurrentUser} from "./redux/user/user.action"

import './App.css';


class App extends React.Component{

  unsubscribeFromAuth = null;

  componentDidMount(){

    const {setCurrentuser} =this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
         setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            })
        });
      } 
       setCurrentuser( userAuth);
    });
  }

   componentWillUnmount(){
      this.unsubscribeFromAuth();
   } 

 render() {
   
  return (
    <div>
      <Header  />
      <Switch>
      <Route exact path='/' component= {HomePage} />
      <Route exact path='/shop' component= {ShopPage} />
      <Route exact path='/signin' render= {() => this.props.currentUser ? (<Redirect to = "/" />) : <SignInAndSignUpPage />} />
      <Route exact path='/checkout' component= {Checkout} />
      </Switch>
    </div>
  );
 }
 
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentuser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
