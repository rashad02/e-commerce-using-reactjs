import React from "react";

import SignInSignOut from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./sign-in-and-sign-up.styles.scss";

const SignInAndSignUpPage = () => {
    return (
        <div className="sign-in-and-sign-up">
        <SignInSignOut />
        <SignUp />
        </div>
    ); 
}

export default SignInAndSignUpPage;