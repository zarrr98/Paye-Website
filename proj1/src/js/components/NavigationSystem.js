import React from "react";
import ReactDOM from "react-dom";
import { withRouter, Link } from "react-router-dom";
import { FaBars, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { NavigationItems, StrorageGetItem } from "../../utils/configs";
import { Strings } from "../../utils/strings";

class NavigationSystem extends React.Component {
  state = {};
  sidebarWidth_lg = "25vw";
  sidebarWidth_sm = "70vw";
  SidebarChangeMediaQuery = "(max-width: 768px)";

  toggleSidebar = () => {
    let sidebar = this.sidebar;
    let topNavbar = this.topNavbar;
    let mainContent = this.mainContent;
    if (sidebar && topNavbar && mainContent) {
      let sidebarStyle = getComputedStyle(sidebar);
      if (sidebarStyle.width === "0px") {
        //it is hidden and it should get opened
        this.openSidebar();
      } else {
        //it should get hide
        this.closeSidebar();
      }
    } else {
      console.log("it DoES Not EXisT");
    }
  };

  openSidebar = () => {
    let sidebar = this.sidebar;
    let topNavbar = this.topNavbar;
    let mainContent = this.mainContent;
    if (sidebar && topNavbar && mainContent) {
      //set the width of opened sidebar based on media query
      let smallScreen = window.matchMedia(this.SidebarChangeMediaQuery).matches;
      let sidebarWidth = smallScreen
        ? this.sidebarWidth_sm
        : this.sidebarWidth_lg;

      sidebar.style.width = sidebarWidth;
      if (!smallScreen) {
        topNavbar.style.marginRight = sidebarWidth;
        mainContent.style.marginRight = sidebarWidth;
      }
    }
  };
  closeSidebar = () => {
    let sidebar = this.sidebar;
    let topNavbar = this.topNavbar;
    let mainContent = this.mainContent;
    if (sidebar && topNavbar && mainContent) {
      sidebar.style.width = "0";
      topNavbar.style.marginRight = "0";
      mainContent.style.marginRight = "0";
    }
  };

  initMediaQueryListener = () => {
    if (matchMedia) {
      let resizeToSmallScreen = window.matchMedia(this.SidebarChangeMediaQuery);
      resizeToSmallScreen.addEventListener("change", this.setNavWhenResize);
      this.setNavWhenResize(resizeToSmallScreen);
    }
  };
  setNavWhenResize = (mq) => {
    console.log("You RESIZED :D , is it small now ? ", mq.matches);
    this.setState({ smallScreen: mq.matches });
    let sidebar = this.sidebar;
    let topNavbar = this.topNavbar;
    let mainContent = this.mainContent;
    if (mq.matches) {
      //small screen (smaller than 768px)

      if (sidebar && topNavbar && mainContent) {
        this.closeSidebar(sidebar, topNavbar, mainContent);
      }
    } else {
      //big screen (bigger than 768px). so show the sidebar
      this.openSidebar(sidebar, topNavbar, mainContent);
    }
  };

  toggleDropdown = (event) => {
    let element = event.target;
    let dropdownContainer = element.nextElementSibling;
    if (dropdownContainer) {
      element.classList.toggle("active-dropdown-button");
      dropdownContainer.classList.toggle("open-dropdown");
    }
  };

  setMarginRightBasedOnProfile = () => {
    let profile = StrorageGetItem(Strings.storage.profile);
    if (!profile && !this.state.smallScreen) {
      let topNavbar = this.topNavbar;
      let mainContent = this.mainContent;
      if (topNavbar && mainContent) {
        topNavbar.style.marginRight = "0";
        mainContent.style.marginRight = "0";
      }
    }
  };
  componentDidMount = () => {
    this.initMediaQueryListener();
    this.setMarginRightBasedOnProfile();
  };
  render() {
    let profile = StrorageGetItem(Strings.storage.profile, true);
    let topNavbarItems = profile
      ? NavigationItems.topNavbar.loggedIn
      : NavigationItems.topNavbar.notLoggedIn;
    let sidebarItems = profile ? NavigationItems.sidebar.loggedIn : [];
    localStorage.removeItem(Strings.storage.profile);
    return (
      <div>
        <div className="navigation">
          <nav
            className="top-navbar"
            ref={(element) => (this.topNavbar = element)}
          >
            <ul>
              {profile || this.state.smallScreen ? (
                <li>
                  <FaBars onClick={this.toggleSidebar} />
                </li>
              ) : null}
              {topNavbarItems.map((item) => {
                return !item.moveToSidebarInSmallScreen ||
                  !this.state.smallScreen ? (
                  <Link to={item.path} style={item.style}>
                    <li>{item.title}</li>
                  </Link>
                ) : null;
              })}
              {/* <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/">
                <li>Home</li>
              </Link> */}
            </ul>
          </nav>

          {profile || this.state.smallScreen ? (
            <div
              className="sidebar"
              ref={(element) => (this.sidebar = element)}
            >
              <ul>
                {[...topNavbarItems , ...sidebarItems].map(item => {
                  
                })}
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/">
                  <li>Contact</li>
                </Link>
                <Link to="/">
                  <li>About</li>
                </Link>
                <Link
                  to="/"
                  className="dropdown-btn"
                  onClick={this.toggleDropdown}
                >
                  Dropdown
                  <FaAngleDown />
                </Link>
                <div className="dropdown-container">
                  <Link to="/">
                    <li>Dropdown1</li>
                  </Link>
                  <Link to="/">
                    <li>Dropdown2</li>
                  </Link>
                  <Link to="/">
                    <li>Dropdown3</li>
                  </Link>
                </div>
                <Link to="/">
                  <li>About2</li>
                </Link>
                <Link to="/">
                  <li>About</li>
                </Link>
              </ul>
            </div>
          ) : null}
        </div>

        <div
          className="main-content"
          ref={(element) => (this.mainContent = element)}
          onClick={this.state.smallScreen ? this.closeSidebar : null}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(NavigationSystem);
