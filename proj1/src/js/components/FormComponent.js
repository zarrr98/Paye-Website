import React from "react";
import { Strings } from "../../utils/strings";
// import { URL } from "../utils/configs";
import { ButtonGroup, Button, Form, Spinner } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { DatePicker } from "jalali-react-datepicker";
import moment from "jalali-moment";
import Dropzone from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
//import { PutData } from "../utils/services";

class FormComponent extends React.Component {
  state = {
    fields: this.props.fields,
    values: {},
    error: false,
    isLoading: false,
    dateError: false,
    acceptedFiles: {}
  };

  setErrorMessage = (name, msg) => {
    this.state.fields.map((item) => {
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

  handleChangeDate = ({ value }, name) => {
    let { values } = this.state;
    console.log("value and name in handleChangeDate : ", value, name);
    let date = new Date(value);
    let momentString = `${
      date.getMonth() + 1
    } ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    console.log("moment string: ", momentString);
    let mdate = moment(momentString, "M DD YYYY HH:mm").format(
      "jYYYY/jMM/jD HH:mm"
    );
    console.log("moment shode ash: ", mdate, "the type : ", typeof mdate);
    if (
      moment(momentString, "M DD YYYY HH:mm").isBefore(
        moment().add(2, "day"),
        "day"
      )
    ) {
      //it's before now
      this.setErrorMessage(name, Strings.createEvent.dateBeforeNowError);
      this.setState({ dateError: true });
      console.log("error : ", Strings.createEvent.dateBeforeNowError);
    } else {
      this.setState({ values: { ...values, [name]: mdate }, dateError: false });
      this.setErrorMessage(name, "");
      console.log("okay and saved in values");
    }
    // this.setState({ values: { ...values, start_date: mdate } });

    // //compare two moments:
    // console.log( moment(momentString,"M DD YYYY HH:mm").isBefore(moment('9 26 2020 14:20',"M DD YYYY HH:mm")))

    // //compare a moment with now:
    // console.log("compare with now : ", moment(momentString,"M DD YYYY HH:mm").isBefore(moment()), " and now is: ", moment().format("M DD YYYY HH:mm"))
  };

  onDrop = (acceptedFiless, key) => {
    let { values, acceptedFiles } = this.state;
    acceptedFiless.length > 0 &&
      this.setState({
        values: { ...values, [key]: acceptedFiless[0] },
        acceptedFiles: { ...acceptedFiles, [key]: acceptedFiless },
        error: false,
        // errorMessage: "",
      });

    acceptedFiless.length > 0 && this.setErrorMessage(key, "");
    acceptedFiless.length > 0 && this.props.setErrorMessage("");
  };

  onDropRejected = (rejected) => {
    console.log("$$ onDropRejected got called => ", rejected);
    alert(Strings.form.onlyPicturesAlert);
  };

  submit = async () => {
    const { values } = this.state;
    console.log("values are : ", values);
    let error = false;
    let copyFields = this.state.fields;
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
      fields: copyFields,
      error,
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
      <Form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
          } else if (item.type === "datePicker") {
            return (
              <React.Fragment>
                <DatePicker
                  label={item.label}
                  onClickSubmitButton={({ value }) =>
                    this.handleChangeDate({ value }, item.name)
                  }
                  className = "date-picker"
                />
                {this.state.dateError || this.state.error ? (
                  <Form.Text className="text-danger">
                    {item.errorMessage}
                  </Form.Text>
                ) : null}
              </React.Fragment>
            );
          }
          if (item.type === "upload-file") {
            return (
              <div>
                {item.label ? <Form.Label>{item.label}</Form.Label> : null}
                <Dropzone
                  onDrop={(acceptedFiles) =>
                    this.onDrop(acceptedFiles, item.name)
                  }
                  onDropRejected={(rejected) =>
                    this.onDropRejected(rejected, item.name)
                  }
                  accept={item.accept}
                  multiple={false}
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject,
                    rejectedFiles,
                  }) => (
                    <div
                      {...getRootProps()}
                      className="text-center upload-file-container "
                    >
                      <input {...getInputProps()} />
                      <p className="gray-text">
                        {!isDragActive && Strings.form.uploadFileExplanation}
                        {isDragActive &&
                          !isDragReject &&
                          Strings.form.WhileDropMessage}
                      </p>
                      <p className="text-danger mt-2">
                        {isDragReject &&
                          // this.setState({
                          //   wrongTypeFileDragged: true,
                          // }) &&
                          Strings.form.uploadFileTypeError}
                      </p>
                      {/* {rejectedFiles && rejectedFiles.length>0 && this.handleRejectedFiles(rejectedFiles)} */}
                      <div className="upload-btn">
                        <FaCloudUploadAlt className="refresh-icon " />{" "}
                        {this.state.values[item.name]
                          ? Strings.form.uploadFileAgain
                          : Strings.form.uploadFile}
                      </div>
                      <ul className="list-group mt-2 margin-top">
                        {this.state.acceptedFiles[item.name] &&
                          this.state.acceptedFiles[item.name].map((acceptedFile) => (
                            <li className="list-group-item list-group-item-success">
                              {acceptedFile.name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </Dropzone>
                {this.state.error ? (
                  <p className="text-danger">{item.errorMessage}</p>
                ) : null}
              </div>
            );
          }
        })}
        <Button
          onClick={this.submit}
          disabled={this.state.isLoading ? true : false}
          className={"w-100"}
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
