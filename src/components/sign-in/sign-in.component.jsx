import React, {Component} from 'react';
import FormInput from "../form-input/form-input.component";

import './sign-in.component.scss';
import CustomButton from "../custom-button/custom-button.component";
import {auth, signInWithGoogle} from "../../firebase/firebase-utils";

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async ev => {
    ev.preventDefault();

    const {email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }

    // this will clear form fields
    this.setState({
      email: '',
      password: ''
    })

  };

  handleChange = ev => {
    const {name, value} = ev.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="sign-in">

        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={this.state.email}
            handleChange={this.handleChange}
            required/>

          <FormInput
            type="password"
            name="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
            required/>

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton type="button"
                          onClick={signInWithGoogle}
                          isGoogleSignIn>
              Sign In With Google
            </CustomButton>
          </div>
        </form>

      </div>
    );
  }
}

export default SignIn;
