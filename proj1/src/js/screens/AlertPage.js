import React from "react";
import { withRouter } from "react-router-dom";


class AlertPage extends React.Component {
  
  render() {
    return (
      <div>
        <h4>{this.props.location.state.title}</h4>
        {this.props.location.state.text}
      </div>
    );
  }
}

export default withRouter(AlertPage);
