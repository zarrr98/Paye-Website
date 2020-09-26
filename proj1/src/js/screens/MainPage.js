import React from "react";
import ReactDOM from "react-dom";
import { withRouter, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

class MainPage extends React.Component {
  toggleSidebar = () => {
    // let thisNode = ReactDOM.findDOMNode(this);
    // let sidebar = thisNode.getElementsByClassName("sidebar")[0]
    // let sidebarClasses = sidebar.classList;
    let sidebar = this.sidebar;
    let topNavbar = this.topNavbar;
    if (sidebar && topNavbar){
    //  console.log("sidebar using callbacks : ", this.sidebar)
      let sidebarClasses = sidebar.classList;
      if (sidebarClasses.contains("sidebar-show")){
        //it should get hide
        sidebarClasses.remove("sidebar-show");
        sidebarClasses.add("sidebar-hide");
        topNavbar.classList.add("top-navbar-complete");
      }else {
        //it is hidden and it should get showen
        sidebarClasses.remove("sidebar-hide");
        sidebarClasses.add("sidebar-show");
        topNavbar.classList.remove("top-navbar-complete");
      }
    }else {
      console.log("it DOES Not EXsisT")
    }
    
    // let sideBarClasses = React.findDOMNode(this.refs.cpDev1).
  };

  componentDidMount = () => {};
  render() {
    return (
      <div>
        <div className="navigation">
          <nav className="top-navbar" ref={element => this.topNavbar = element}>
            <ul>
              <FaBars onClick={this.toggleSidebar} />
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

          <div className="sidebar sidebar-show" ref={element => this.sidebar = element}>
            <ul>
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
          </div>
        </div>

        <diV>this is me trying!! :)</diV>
      </div>
    );
  }
}

export default withRouter(MainPage);
