import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import {auth, createUserProfileDocument} from "./firebase/firebase.util";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";

import Dashboard from "./page/admin-panel/admin-dashboard.component";
import HomePage from "./page/homepage/homepage.component";
import ShopPage from "./page/shop-page/shop-page.component";
import Header from "./components/header/header.component";
import Checkout from "./page/checkout/checkout.component";
import SignInAndSignUpPage from "./components/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { setCurrentUser } from "./redux/user/user.action";
import { getUser } from "./redux/user/user.util";

import "./App.css";

const App = ({ currentUser, setCurrentuser }) => {
    useEffect(() => {
        setTimeout(() => {
            const userId = localStorage.getItem("userId");

            if (userId && userId !== "undefined" && userId !== "") {
                new Promise((resolve, reject) => {
                    getUser(userId).then((response) => {
                        setCurrentuser(response);
                        resolve(response);
                    });
                });
            }
        }, 1000);
    }, [setCurrentuser]);

    return (
        <div>
            <Header />
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route
                    path="/admin/*"
                    element={
                        currentUser && currentUser.type === "admin" ? (
                            <Dashboard />
                        ) : (
                            <SignInAndSignUpPage />
                        )
                    }
                />
                <Route path="/shop/*" element={<ShopPage />} />
                <Route
                    exact
                    path="/signin"
                    element={
                        currentUser ? (
                            <Navigate to="/" />
                        ) : (
                            <SignInAndSignUpPage />
                        )
                    }
                />
                <Route
                    exact
                    path="/checkout"
                    // render={() =>
                    //     currentUser ? element={} : <Navigate to="/signin" />
                    // }
                    element={
                        currentUser ? (
                            <Checkout />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                // element={<Checkout />}
                />
            </Routes>
            {/* </BrowserRouter> */}
        </div>
    );
};
// class App extends React.Component {
//     componentDidMount() {
//         const { setCurrentuser } = this.props;

//         const userId = localStorage.getItem("userId");

//         if (userId && userId !== "undefined" && userId !== "") {
//             new Promise((resolve, reject) => {
//                 getUser(userId).then((response) => {
//                     setCurrentuser(response);
//                     resolve(response);
//                 });
//             });
//         }
//     }
//     render() {}
// }

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentuser: (userId) => dispatch(setCurrentUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
