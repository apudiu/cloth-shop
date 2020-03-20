import React, {Component} from 'react';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import './sing-up.style.scss';
import {auth, createUserProfileDocument} from "../../firebase/firebase-utils";

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  //
  handleSubmit = async e => {
    e.preventDefault();

    const {displayName, email, password, confirmPassword} = this.state;

    // check passwords match
    if (password !== confirmPassword) {

      alert("Confirm password doesn't matched");
      return;
    }

    // register the user in firebase
    try {

      // create user in firebase auth (provider)
      const {user} = await auth.createUserWithEmailAndPassword(email, password);

      // store user in firebase firestore
      await createUserProfileDocument(user, {displayName});

      // clearing the sign up form
      this.setState({
        displayName: '',
        emai: '',
        password: '',
        confirmPassword: ''
      });

    } catch (e) {
      console.log(e);
    }
  };

  handleChange = e => {

    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {

    const {displayName, email, password, confirmPassword} = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className="sing-up-form" onSubmit={this.handleSubmit}>

          <FormInput
            handleChange={this.handleChange}
            type="text"
            label="Display Name"
            name="displayName"
            value={displayName}
            required
          />
          <FormInput
            handleChange={this.handleChange}
            type="email"
            label="Email"
            name="email"
            value={email}
            required
          />
          <FormInput
            handleChange={this.handleChange}
            type="password"
            label="Password"
            name="password"
            value={password}
            required
          />
          <FormInput
            handleChange={this.handleChange}
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            required
          />

          <CustomButton type="submit">SIGN UP</CustomButton>

        </form>

      </div>
    );
  }
}

export default SignUp;
