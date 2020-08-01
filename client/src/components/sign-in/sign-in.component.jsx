import React from 'react';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth,signInWithGoogle} from "../../firebase/firebase.util";

import "./sign-in.styles.scss";


class SignInSignOut extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        const {email, password} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email, password);

            this.setState({email: "", password: ""});

        } catch(error) {
            console.error(error);
        }
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({ [name] : value});
    }


    render(){

        const {email, password} =this.state;

        return (
            <div className= "sign-in">
                <h2 className="title"> I already have an account</h2>
                <span>Sign In with your email and password</span> 
               
                <form onSubmit={this.handleSubmit}>
                <FormInput type="email" value={email} name="email" handleChange= {this.handleChange} label= "Email" required />
                <FormInput type="password"  value= {password} name="password" handleChange= {this.handleChange} label= "Password" required />
                <div className="buttons">
                    <CustomButton type="submit"> Sign In</CustomButton>
                <CustomButton onClick= {signInWithGoogle} googleSignIn> Sign In with Google</CustomButton>
                </div>
                </form>
            </div> 
        )
    }
}

export default SignInSignOut;
