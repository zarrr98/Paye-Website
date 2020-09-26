import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Strings } from "../../utils/strings";
import { PutData } from "../../utils/services";
import { URL } from "../../utils/configs";
import FormComponent from "../components/FormComponent";
import { Link, withRouter } from "react-router-dom";

class SignupPage extends React.Component {
  state = {
    errorMessage:"",
  };
  fields = [
    {
      type: "text",
      formType: "text",
      label: Strings.signup.namePlaceholder,
      controlId: "formName",
      name: "name",
      errorMessage: "",
      required: true,
    },
    {
      type: "text",
      formType: "text",
      label: Strings.signup.familyNamePlaceholder,
      controlId: "formFamilyName",
      name: "familyName",
      errorMessage: "",
      required: true,
    },
    {
      type: "text",
      formType: "email",
      label: Strings.signup.emailPlaceholder,
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
      label: Strings.signup.passwordPlaceholder,
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
      this.props.history.push({
        pathname: "/alert",
        state: {
          title: Strings.alerts.confirmationTitle,
          text: Strings.alerts.signupNewUserConfirmation,
        },
      });
    } else if (response.status === 409) {
      this.setState({ errorMessage: Strings.signup.duplicatedEmailError });
    } else if (response.status === 500) {
      this.setState({ errorMessage: Strings.form.connectionError });
    } else {
      this.setState({ errorMessage: Strings.form.connectionError });
    }
  };
  submitMethod = async (values) => {
    const data = await PutData(
      `${URL.protocol}://${URL.baseURL}:${URL.port}/${URL.path}/signup`,
      values
    );
    this.checkResponseStatus(data);
  };
  render() {
    return (
      <div className="centered-container">
        <Card className="form-container">
          <Card.Title className="title">
            {Strings.signup.signupTitle}
          </Card.Title>
          <Card.Body>
            <FormComponent
              errorMessage={this.state.errorMessage}
              setErrorMessage={this.setErrorMessage}
              fields={this.fields}
              submitMethod={this.submitMethod}
              submitButtonText = {Strings.form.register}
            />
            <p className="margin-top text-center">
              <p className="text-danger">{this.state.errorMessage}</p>
              {Strings.signup.haveAccount}
              <Link to="/login">{Strings.signup.comein}</Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withRouter(SignupPage);
