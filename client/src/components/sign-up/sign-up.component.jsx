import React from 'react';
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import ToggleSwitch from "../custom-button/toggle-button.component";

import {setCurrentUser, userTypeToggle} from "../../redux/user/user.action";
import {registerUser} from "../../redux/user/user.util";

import './sign-up.styles.scss';

class SignUp extends React.Component{

    constructor(){
        super();

        this.state = {
            toggleChecked: false,
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            type: "user"
        }
    }

   

    handleSubmit = async event => {
        event.preventDefault();

        const {setCurrentUser} = this.props;

        const {displayName, email, password, confirmPassword, type} =this.state;

        if(password !== confirmPassword){
            alert("Password not match");
            return ;
        } 

        try{

            let user = {
                name: displayName,
                email,
                password,
                type
            }
            
            new Promise((resolve, reject) => {
                registerUser(user).then((response) => {
                    setCurrentUser(response);
                   resolve(response);
                });
             });
           
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch(error) {
            console.log(error);
        }

    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({ [name] : value});
    }

    onToggleChange = newValue => {
        const {userTypeToggle} = this.props;

        if(newValue === 'user') this.setState({type: 'admin'});
        else this.setState({type: 'user'});;
    
        userTypeToggle(newValue);
    }


    render(){

        const {displayName, email, password, confirmPassword, type} =this.state;
        
        return (
            <div className= "sign-up">
                <h2 className="title"> I do not have an account</h2>
                <span>Sign Up with your email and password</span> 

                <form className="sign-up-form" onSubmit= {this.handleSubmit}>
                <FormInput type="text"  value= {displayName} name="displayName" handleChange= {this.handleChange} label= "Display Name" required />
                <FormInput type="email" value={email} name="email" handleChange= {this.handleChange} label= "Email" required />
                <FormInput type="password"  value= {password} name="password" handleChange= {this.handleChange} label= "Password" required />
                <FormInput type="password"  value= {confirmPassword} name="confirmPassword" handleChange= {this.handleChange} label= "Confirm Password" required />
                
                <div className="user-type-section">
                    <div className="user-type-text">Choose user type: </div>
                    <ToggleSwitch isOn={type === 'user' ? false: true} onColor="#EF476F"offText={'User'} onText={'Admin'} onChange={(e) =>this.onToggleChange(type)}/>
                </div>
                
                
                <div className="buttons">
                <CustomButton id="custom-toggle" type="submit"> Sign Up</CustomButton>
                </div>
                </form>
            </div> 
        )
    }
}



const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    userTypeToggle: type => dispatch(userTypeToggle(type))
})

export default connect(null, mapDispatchToProps)(SignUp);
