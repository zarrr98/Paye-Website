import React from "react";
import { ListGroup, Card } from "react-bootstrap";
import ListItem from './ListItem';

export default class ListComponent extends React.Component {
  render() {
    return (
      <ListGroup>
        {this.props.data.map((item, i) => {
          return (
            <ListGroup.Item>
                <ListItem item = {item}/>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}
