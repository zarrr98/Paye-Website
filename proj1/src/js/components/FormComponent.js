import React from "react";
import { Strings } from "../../utils/strings";
// import { URL } from "../utils/configs";
import { ButtonGroup, Button, Form, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
//import { PutData } from "../utils/services";

class FormComponent extends React.Component {
  state = {
    fields : this.props.fields,
    values: {},
    error: false,
    isLoading: false,
  };


  setErrorMessage = (name, msg) => {
    this.state.fields.map(item => {
      if (item.name === name) {
        item.errorMessage = msg;
      }
    });
  };

  handleChange = (key, e) => {
    const { values } = this.state;
    this.setState({
      values: { ...values, [key]: e },
      error: false,
      //errorMessage: ""
    });
    this.props.setErrorMessage("");
    this.setErrorMessage(key, "");
  };
  

  submit = async () => {
    const { values } = this.state;
    console.log("values are : ", values);
    let error = false;
    let copyFields = this.state.fields
    copyFields.map((item, i) => {
      if (item.required && !values[item.name]) {
        item.errorMessage = Strings.form.emptyError;
        error = true;
      } else if (item.validationFunction) {
        if (!item.validationFunction(values[item.name])) {
          item.errorMessage = item.unvalidMessage;
          error = true;
        }
      }
    });
    this.setState({
      fields : copyFields,
      error
    });
    if (!error) {
      this.setState({ isLoading: true });
      await this.props.submitMethod(values);
      this.setState({ isLoading: false });
     // console.log("data is : ",data)
     // this.checkResponseStatus(data);
    }
  };



  render() {
    return (
      <Form autoComplete="off">
        {this.state.fields.map((item, i) => {
          if (item.type === "text") {
            return (
              <Form.Group controlId={item.controlId} className="margin-top">
                {item.label ? <Form.Label>{item.label}</Form.Label> : null}
                <Form.Control
                  type={item.formType}
                  placeholder={item.placeholder}
                  onChange={(e) => this.handleChange(item.name, e.target.value)}
                  value={this.state.values[item.name]}
                />
                {this.state.error ? (
                  <Form.Text className="text-danger">
                    {item.errorMessage}
                  </Form.Text>
                ) : null}
              </Form.Group>
            );
          }
        })}
        <Button
          onClick={this.submit}
          disabled={this.state.isLoading ? true : false}
          className = {"w-100"}
        >
          {this.state.isLoading ? (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
          {this.props.submitButtonText}
        </Button>
        
      </Form>
    );
  }
}

export default withRouter(FormComponent);
