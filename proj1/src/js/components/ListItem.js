import React from "react";
import { Card } from "react-bootstrap";

export default class ListItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.start_date}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
