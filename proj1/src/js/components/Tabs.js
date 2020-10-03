import React from "react";

export default class Tabs extends React.Component {
  state = {
    active: 0,
    isLoading : this.props.isLoading,
    tabData : this.props.tabData,
  };

  clickOnTabsHandler = (e) => {
    this.setState({
      active: parseInt(e.currentTarget.attributes.num.value),
    });
  };
  static getDerivedStateFromProps (props , state) {
    
    if (props.tabData.length !== state.tabData.length){
      return {
        tabData : props.tabData
      }
    }else if (props.isLoading !== state.isLoading){
      return{
        isLoading : props.isLoading
      }
    }
    return null;
  }
  render() {
    let tabs = this.props.tabData.map((item, i) => {
      return (
        <li
          className={this.state.active === i ? "tab active" : "tab"}
          num={i}
          onClick={this.clickOnTabsHandler}
        >
          {item.tabName}
        </li>
      );
    });
   // let tabContent = 
    return (
      <section className="tabs">
        <menu>
          <ul>{tabs}</ul>
        </menu>
        <TabContent active={this.state.active} tabData={this.props.tabData} />
      </section>
    );
  }
}

class TabContent extends React.Component {
  render() {
    let activeId = this.props.active;
    let content = this.props.tabData.map((data, index) => {
      return (
        <div className={"tab-item " + (activeId === index ? "show" : "")}>
          <ul>
            {data.data.map((d) => {
              return <p>{d.title}</p>;
            })}
          </ul>
        </div>
      );
    });
    return <div>{content}</div>;
  }
}
