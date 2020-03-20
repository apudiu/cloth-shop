import React from 'react';

import './sign-in-and-up.component.scss';
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SignInAndUp = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn/>
      <SignUp/>
    </div>
  );
};

export default SignInAndUp;
