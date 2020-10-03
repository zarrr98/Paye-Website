import React from "react"
import { Strings } from "../../utils/strings";

export default class Empty extends React.Component {
  static defaultProps = {
    children: Strings.empty.default,
  };

  render() {
    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}
