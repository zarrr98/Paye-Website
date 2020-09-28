import React from "react";
import { StrorageGetItem } from "../../utils/configs";
import { Strings } from "../../utils/strings";
import NavigationSystem from "../components/NavigationSystem";
import Tabs from "../components/Tabs";
import AddButton from "../components/AddButton";

export default class Dashboard extends React.Component {
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
  render() {
    let profile = StrorageGetItem(Strings.storage.profile, true);
    console.log("profile in dashboard : ", profile);
    return (
      <NavigationSystem selectedTab={Strings.navigationItems.title.dashboard}>
        <div className="relative-pos">
          <p>ایونت های من</p>
          <Tabs tabData={this.myEvents} />
          <AddButton tooltipText = {Strings.tooltip.createEvent}/>
        </div>
      </NavigationSystem>
    );
  }
}
