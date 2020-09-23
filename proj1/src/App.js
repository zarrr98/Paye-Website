import React from "react";
import logo from "./logo.svg";
import "./assets/css/style.css";
import { FetchData, PutData } from "./utils/services";
import { URL } from "./utils/configs";
import SignupPage from "./js/screens/SignupPage";
import LoginPage from "./js/screens/LoginPage";
import AlertPage from "./js/screens/AlertPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {};

  render() {
    return (
      <Router>
        <Switch>
          <Route path={"/"} exact>
            <h2>main page or sth </h2>
          </Route>
          <Route path={"/signup"}>
            <SignupPage />
          </Route>
          <Route path={"/login"}>
            <LoginPage />
          </Route>
          <Route path={"/alert"}>
            <AlertPage/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
