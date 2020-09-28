import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Strings } from "../../utils/strings";
import {withRouter} from 'react-router-dom'
import { GotoPage } from "../../utils/configs";

class AddButton extends React.Component {
  static defaultProps = {
    tooltipPlacement: "right",
    tooltipText: Strings.tooltip.default,
  };

  gotoCreateEventPage = () => {
    GotoPage(Strings.navigationItems.path.createEvent , this)
  }
  render() {
    return (
      <OverlayTrigger
        placement={this.props.tooltipPlacement}
        overlay={<Tooltip>{this.props.tooltipText}</Tooltip>}
      >
        <FaPlusCircle className="add-circular-btn" onClick={this.gotoCreateEventPage}/>
      </OverlayTrigger>
    );
  }
}

export default withRouter(AddButton);
