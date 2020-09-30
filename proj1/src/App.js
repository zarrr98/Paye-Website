import React from "react";
import logo from "./logo.svg";
import "./assets/css/style.css";
import { FetchData, PutData } from "./utils/services";
import { StorageSetItem, URL } from "./utils/configs";
import SignupPage from "./js/screens/SignupPage";
import LoginPage from "./js/screens/LoginPage";
import AlertPage from "./js/screens/AlertPage";
import Dashboard from './js/screens/Dashboard';
import MainPage from './js/screens/MainPage'; 
import CreateEvent from './js/screens/CreateEvent';
import NavigationSystem from './js/components/NavigationSystem';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Strings } from "./utils/strings";

class App extends React.Component {
  state = {
    profile : null,
  };

  setProfile = (profile) => {
    this.setState({profile})
    StorageSetItem(Strings.storage.profile, profile , true);
  }

  render() {
    return (
      <Router>
        
        <Switch>
          <Route path={"/"} exact>
            <MainPage/>
          </Route>
          <Route path={"/signup"}>
            <SignupPage />
          </Route>
          <Route path={"/login"}>
            <LoginPage setProfile = {this.setProfile}/>
          </Route>
          <Route path={"/alert"}>
            <AlertPage/>
          </Route>
          <Route path={"/dashboard"}>
            <Dashboard/>
          </Route>
          <Route path={Strings.navigationItems.path.createEvent}>
            <CreateEvent/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
