import React from 'react'
import {
  Card,
} from 'react-bootstrap'

class IFGrid extends React.Component {
  constructor(props, w, h) {
    super(props)
    this.gridWidth = props.gridWidth
    this.gridHeight = props.gridHeight
  }

  render() {
    return (
      <Card style={{ width: '180px', height: '180px' }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            the card's content.
        </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export { IFGrid }