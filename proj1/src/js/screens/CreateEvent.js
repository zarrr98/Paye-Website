import React from "react";
import NavigationSystem from "../components/NavigationSystem";
import { DatePicker } from "jalali-react-datepicker";
import moment from "jalali-moment";
import { Strings } from "../../utils/strings";
import { Button } from "react-bootstrap";
import { SendDataAndFile } from "../../utils/services";
import {
  GotoPage,
  ImageAcceptedFileTypes,
  StorageRemoveItem,
  StrorageGetItem,
  URL,
} from "../../utils/configs";
import { Card } from "react-bootstrap";
import FormComponent from "../components/FormComponent";

export default class CreateEvent extends React.Component {
  state = {
    errorMessage: "",
    successMessage: "",
  };
  fields = [
    {
      type: "text",
      formType: "text",
      label: Strings.createEvent.titleLable,
      placeholder: Strings.createEvent.titlePlaceholder,
      controlId: "EventTitle",
      name: "title",
      errorMessage: "",
      required: true,
    },
    {
      type: "datePicker",
      label: Strings.createEvent.startDateLable,
      controlId: "EventStartDate",
      name: "start_date",
      errorMessage: "",
      required: true,
    },
    {
      type: "text",
      formType: "number",
      label: Strings.createEvent.capacityLable,
      min: 2,
      name: "capacity",
      errorMessage: "",
      placeholder: Strings.createEvent.capacityPlaceholder,
      required: true,
      validationFunction: (value) => {
        return value > 1;
      },
      unvalidMessage: Strings.createEvent.capacityUnvalidMessage,
    },
    {
      type: "upload-file",
      accept: ImageAcceptedFileTypes,
      label: Strings.createEvent.pictureLable,
      name: "picture",
      errorMessage: "",
      required: false,
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
      this.setState({
        successMessage: Strings.createEvent.successfullyCreatedMessage,
      });
    } else if (response.status === 413) {
      //token has been expired
      StorageRemoveItem(Strings.storage.profile);
      GotoPage(Strings.navigationItems.path.mainPage, this);
    } else if (response.status === 500) {
      this.setState({ errorMessage: Strings.form.connectionError });
    } else {
      this.setState({ errorMessage: Strings.form.connectionError });
    }
  };
  submitMethod = async (values) => {
    console.log("values in submit method : ", values);
    this.setState({errorMessage : "", successMessage: ""});

    let profile = StrorageGetItem(Strings.storage.profile, true);
    let data = await SendDataAndFile(
      `${URL.protocol}://${URL.baseURL}:${URL.port}/${URL.path}/createevent`,
      values,
      profile.token,
      "PUT"
    );
    console.log("****data : ", data);
    this.checkResponseStatus(data);
  };
  changeDate = ({ value }) => {
    let { values } = this.state;
    let date = new Date(value);
    let momentString = `${
      date.getMonth() + 1
    } ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    console.log("moment string: ", momentString);
    let mdate = moment(momentString, "M DD YYYY HH:mm").format(
      "jYYYY/jMM/jD HH:mm"
    );
    console.log("moment shode ash: ", mdate, "the type : ", typeof mdate);
    this.setState({ values: { ...values, start_date: mdate } });

    // //compare two moments:
    // console.log( moment(momentString,"M DD YYYY HH:mm").isBefore(moment('9 26 2020 14:20',"M DD YYYY HH:mm")))

    // //compare a moment with now:
    // console.log("compare with now : ", moment(momentString,"M DD YYYY HH:mm").isBefore(moment()), " and now is: ", moment().format("M DD YYYY HH:mm"))
  };

  render() {
    return (
      <NavigationSystem selectedTab={Strings.navigationItems.title.myEvents}>
        {/* <DatePicker onClickSubmitButton={this.changeDate}/>
                <Button variant="danger" onClick={this.submit}>send to server</Button> */}
        <div className="centered-container">
          <Card className="event-form-container">
            <Card.Title className="title">
              {Strings.createEvent.formTitle}
            </Card.Title>
            <Card.Body>
              <FormComponent
                errorMessage={this.state.errorMessage}
                setErrorMessage={this.setErrorMessage}
                fields={this.fields}
                submitMethod={this.submitMethod}
                submitButtonText={Strings.createEvent.submitButtonText}
              />
              <p className="margin-top text-center text-danger">
                {this.state.errorMessage}
              </p>
              <p className="margin-top text-center text-success">
                {this.state.successMessage}
              </p>
            </Card.Body>
          </Card>
        </div>
      </NavigationSystem>
    );
  }
}
