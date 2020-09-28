import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Strings } from "../../utils/strings";
import { FetchData } from "../../utils/services";
import { GotoPage, URL } from "../../utils/configs";
import FormComponent from "../components/FormComponent";
import { Link, withRouter } from "react-router-dom";

class LoginPage extends React.Component {
  state = {
    errorMessage: "",
  };
  fields = [
    {
      type: "text",
      formType: "email",
      label: Strings.login.emailPlaceholder,
      controlId: "formEmail",
      name: "email",
      errorMessage: "",
      required: true,
      validationFunction: (value) => /(.+)@(.+){2,}\.(.+){2,}/.test(value),
      unvalidMessage: Strings.form.invalidEmailError,
    },
    {
      type: "text",
      formType: "password",
      label: Strings.login.passwordPlaceholder,
      controlId: "formPassword",
      name: "password",
      errorMessage: "",
      required: true,
    },
  ];

  setErrorMessage = (msg) => {
    this.setState({ errorMessage: msg });
  };

  checkResponseStatus = (response) => {
    if (!response) {
      this.setState({
        errorMessage: Strings.form.connectionError,
      });
    } else if (response.status === 200) {
      console.log("logged in successfully, response :", response.resolve);
      this.props.setProfile(response.resolve);

      GotoPage(Strings.navigationItems.path.dashboard, this);
    } else if (response.status === 201) {
      // this.props.history.push({
      //   pathname: "/alert",
      //   state: {
      //     title: Strings.alerts.confirmationTitle,
      //     text: Strings.alerts.loginUserNotConfirmed,
      //   },
      // });
      GotoPage(Strings.notNavigationalPaths.alert, this, {
        title: Strings.alerts.confirmationTitle,
        text: Strings.alerts.loginUserNotConfirmed,
      });
    } else if (response.status === 403) {
      this.setState({ errorMessage: Strings.login.wrongUserOrPassError });
    } else if (response.status === 500) {
      this.setState({ errorMessage: Strings.form.connectionError });
    } else {
      this.setState({ errorMessage: Strings.form.connectionError });
    }
  };
  submitMethod = async (values) => {
    console.log("values in submit method : ", values);
    const data = await FetchData(
      `${URL.protocol}://${URL.baseURL}:${URL.port}/${URL.path}/login/${values.email}/${values.password}`
    );
    this.checkResponseStatus(data);
  };
  render() {
    return (
      <div className="centered-container">
        <Card className="form-container">
          <Card.Title className="title">{Strings.login.loginTitle}</Card.Title>
          <Card.Body>
            <FormComponent
              errorMessage={this.state.errorMessage}
              setErrorMessage={this.setErrorMessage}
              fields={this.fields}
              submitMethod={this.submitMethod}
              submitButtonText={Strings.form.login}
            />
            <p className="margin-top text-center">
              <p className="text-danger">{this.state.errorMessage}</p>
              {Strings.login.notHaveAccount}
              <Link to="/signup">{Strings.login.signup}</Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withRouter(LoginPage);
