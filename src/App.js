import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';


import Homepage from "./pages/homepage/homepage.component";
import Shop from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndUp from "./pages/sign-in-and-up/sign-in-and-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase-utils";


class App extends Component {

  unsubscribeFromAuth = null;

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      // if user authenticated
      if (userAuth) {

        // creating or getting user reference
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {

          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
          console.log(this.state);
        });
      } else {
        this.setState({
          currentUser: userAuth
        });
      }

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/*As this is outside of switch & route, this will be present always*/}
        <Header currentUser={this.state.currentUser} />

        {/*Switch renders first match then nothing*/}
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/shop" component={Shop}/>
          <Route path="/signin" component={SignInAndUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;
