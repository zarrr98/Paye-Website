import React from "react";
import { StrorageGetItem, URL } from "../../utils/configs";
import { Strings } from "../../utils/strings";
import NavigationSystem from "../components/NavigationSystem";
import Tabs from "../components/Tabs";
import AddButton from "../components/AddButton";
import { FetchData } from "../../utils/services";

export default class Dashboard extends React.Component {
  state = {
    isLoading: false,
    myEvents: [
      { tabName: "ایجاد شده", data: [] },
      { tabName: "درخواست شده", data: [] },],
  };
  myEvents = [
    {
      tabName: "جاری",
      data: ["کوهنوردی", "درس خوندن برای کنکور", "کنسرت تیلور سویفت"],
    },
    {
      tabName: "به پایان رسیده",
      data: [
        "خواندن زبان آیلتس",
        "یاد گرفتن برنامه نویسی",
        "ختم قرآن",
        "کنسرت کیتی پری",
      ],
    },
  ];
  divideDataIntoTabs = (response) => {
    let profile = StrorageGetItem(Strings.storage.profile, true);
    let data = response ? response.resolve : [];
    let createdEvents = data.filter((d) => d.owner === profile._id);
    let requestedEvents = data.filter((d) => d.owner !== profile._id);

    this.setState({
      myEvents: [
        { tabName: "ایجاد شده", data: createdEvents },
        { tabName: "درخواست شده", data: requestedEvents },
      ],
    });
  };
  getEvents = async () => {
    let profile = StrorageGetItem(Strings.storage.profile, true);
    this.setState({ isLoading: true });
    let data = await FetchData(
      `${URL.protocol}://${URL.baseURL}:${URL.port}/${
        URL.path
      }/myevents/${true}/${true}`,
      profile.token
    );

    console.log("the data : ", data);
    this.divideDataIntoTabs(data);
    this.setState({ isLoading: false });
  };
  componentDidMount = () => {
    this.getEvents();
  };
  render() {
    let profile = StrorageGetItem(Strings.storage.profile, true);
    console.log("profile in dashboard : ", profile);
    return (
      <NavigationSystem selectedTab={Strings.navigationItems.title.dashboard}>
        <div className="relative-pos">
          <p>ایونت های من</p>
          <Tabs tabData={this.state.myEvents} isLoading={this.state.isLoading}/>
          <AddButton tooltipText={Strings.tooltip.createEvent} />
        </div>
      </NavigationSystem>
    );
  }
}
