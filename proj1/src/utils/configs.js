import { Strings } from "./strings";

export const URL = {
  protocol: "http",
  baseURL: "localhost",
  path: "apis",
  port: "4000",
  // protocol: "https",
  // baseURL: "transis.herokuapp.com",
  // port: "/apis",
};

export const StorageSetItem = (key, value, isObj) => {
  let val;
  if (isObj) {
    val = JSON.stringify(value);
  } else {
    val = value;
  }

  localStorage.setItem(key, val);
};

export const StrorageGetItem = (key, isObj) => {
  let value = localStorage.getItem(key);
  if (isObj) {
    return JSON.parse(value);
  } else {
    return value;
  }
};

export const StorageRemoveItem = (key) => {
  localStorage.removeItem(key);
};

export const NavigationItems = {
  topNavbar: {
    notLoggedIn: [
      {
        title: Strings.navigationItems.title.mainPage,
        path: Strings.navigationItems.path.mainPage,
        moveToSidebarInSmallScreen: true,
      },
      {
        title: Strings.navigationItems.title.about,
        path: Strings.navigationItems.path.about,
        moveToSidebarInSmallScreen: true,
      },
      {
        title: Strings.navigationItems.title.help,
        path: Strings.navigationItems.path.help,
        moveToSidebarInSmallScreen: true,
      },
      {
        title: Strings.navigationItems.title.loginSignup,
        path: Strings.navigationItems.path.loginSignup,
        moveToSidebarInSmallScreen: false,
      },
    ],
    loggedIn: [
      {
        title: Strings.navigationItems.title.profile,
        path: Strings.navigationItems.path.profile,
        moveToSidebarInSmallScreen: false,
      },
    ],
  },
  sidebar: {
    loggedIn: [
      {
        title: Strings.navigationItems.title.mainPage,
        path: Strings.navigationItems.path.mainPage,
      },
      {
        title: Strings.navigationItems.title.about,
        path: Strings.navigationItems.path.about,
      },
      {
        title: Strings.navigationItems.title.help,
        path: Strings.navigationItems.path.help,
      },
      {
        title: Strings.navigationItems.title.dashboard,
        path: Strings.navigationItems.path.dashboard,
      },
      {
        title: Strings.navigationItems.title.myEvents,
       // path: Strings.navigationItems.path.myEvents,
        dropDownOptions: [
          {
            title: Strings.navigationItems.title.createEvent,
            path: Strings.navigationItems.path.createEvent,
          },
          {
            title: Strings.navigationItems.title.currentEvents,
            path: Strings.navigationItems.path.currentEvents,
          },
          {
            title: Strings.navigationItems.title.completedEvents,
            path: Strings.navigationItems.path.completedEvents,
          },
        ],
      },
      {
        title: Strings.navigationItems.title.othersEvents,
        path: Strings.navigationItems.path.othersEvents,
      },
    ],
  },
};
