import React from 'react';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, createUserProfileDocument} from "../../firebase/firebase.util";

import './sign-up.styles.scss';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} =this.state;

        if(password !== confirmPassword){
            alert("Password not match");
            return ;
        } 

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password);

            createUserProfileDocument (user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch(error) {
            console.error(error)
        }

    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({ [name] : value});
    }


    render(){

        const {displayName, email, password, confirmPassword} =this.state;

        return (
            <div className= "sign-up">
                <h2 className="title"> I do not have an account</h2>
                <span>Sign Up with your email and password</span> 

                <form className="sign-up-form" onSubmit= {this.handleSubmit}>
                <FormInput type="text"  value= {displayName} name="displayName" handleChange= {this.handleChange} label= "Display Name" required />
                <FormInput type="email" value={email} name="email" handleChange= {this.handleChange} label= "Email" required />
                <FormInput type="password"  value= {password} name="password" handleChange= {this.handleChange} label= "Password" required />
                <FormInput type="password"  value= {confirmPassword} name="confirmPassword" handleChange= {this.handleChange} label= "Confirm Password" required />
                
                
                <div className="buttons">
                <CustomButton type="submit"> Sign Up</CustomButton>
                </div>
                </form>
            </div> 
        )
    }
}

export default SignUp;
