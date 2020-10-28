import React from 'react';
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {setCurrentUser} from "../../redux/user/user.action";
import {loginUser} from "../../redux/user/user.util";

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

        const {setCurrentUser} = this.props;
        const {email, password} = this.state;

        try{
            new Promise((resolve, reject) => {
                loginUser({email, password}).then((response) => {
                   setCurrentUser(response);
                   resolve(response);
                });
             });

            this.setState({email: "", password: ""});

        } catch(error) {
            console.error(error);
        }
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({ [name] : value});
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
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
                {/* <CustomButton onClick= {signInWithGoogle} googleSignIn> Sign In with Google</CustomButton> */}
                </div>
                </form>
            </div> 
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(SignInSignOut);
