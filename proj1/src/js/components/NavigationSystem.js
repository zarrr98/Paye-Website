import React from "react";
import ReactDOM from "react-dom";
import { withRouter, Link } from "react-router-dom";
import { FaBars, FaAngleDown, FaAngleUp } from "react-icons/fa";

class NavigationSystem extends React.Component {
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

  componentDidMount = () => {
    this.initMediaQueryListener();
  };
  render() {
    return (
      <div>
        <div className="navigation">
          <nav
            className="top-navbar"
            ref={(element) => (this.topNavbar = element)}
          >
            <ul>
              <li>
                <FaBars onClick={this.toggleSidebar} />
              </li>

              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/">
                <li>Home</li>
              </Link>
            </ul>
          </nav>

          <div className="sidebar" ref={(element) => (this.sidebar = element)}>
            <ul>
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
        </div>

        <div
          className="main-content"
          ref={(element) => (this.mainContent = element)}
          onClick={this.closeSidebar}
        >
          this is me trying!! :) uld avoid using the solution like since it
          overrides the window.onresize event handler function. You should
          better assign a new event handler to the resize event using event
          listener, as shown in the example above. Please check out the tutorial
          on JavaScript event listeners to learn more about it. Related FAQ Here
          are some more FAQ related to this topic: How to call multiple
          JavaScript functions in a single onclick event How to bind click event
          to dynamically added HTML elements in jQuery How to stop firing event
          until an effect is finished in jQuery
        </div>
      </div>
    );
  }
}

export default withRouter(NavigationSystem);
