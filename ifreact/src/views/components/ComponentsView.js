import React from 'react'
import {
  Col,
  Card,
} from 'react-bootstrap'
import sizeMe from 'react-sizeme'

class IFGrid extends React.Component {
  constructor(props) {
    super(props)
    this.width = props.width
    this.height = props.height
    this.children = props.children
  }

  render() {
    return (
      <Card style={{ width: this.width, height: this.height }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          {this.children}
        </Card.Body>
      </Card>
    );
  }
}

function flowArrangement(components, colNum) {
  let currentColNum = 0
  let currentRowNum = 0
  const arrangedComponents = []
  for (const component of components) {
    if (currentColNum >= colNum) {
      currentColNum = 0
      currentRowNum++
    }
    component['gridX'] = currentRowNum
    component['gridY'] = currentColNum
    arrangedComponents.push(component)
    currentColNum++
  }
  return arrangedComponents
}

function ComponentsView(props) {
  const { width } = props.size
  const gridWidth = 200
  const gridHeight = 200
  const gridInset = 20
  const colNum = parseInt(width / gridWidth)
  const horizontalOffset = parseInt((width % gridWidth) / 2)

  const demoComponentNum = 26
  const components = []
  for (const i of [...Array(demoComponentNum).keys()]) {
    components.push({
      name: 'Demo Component ' + i,
      content: <div>{'this is component ' + i}</div>,
      width: 1,
      height: 1,
    })
  }
  const arrangement = []
  const arrangedComponents = flowArrangement(components, colNum, horizontalOffset)
  for (const arrangedComponent of arrangedComponents) {
    const ifgc = <Col><IFGrid width={arrangedComponent.width * gridWidth - gridInset} height={arrangedComponent.height * gridHeight - gridInset}>{arrangedComponent.content}</IFGrid></Col>
    arrangement.push(<div key={arrangedComponent.name} style={{ position: 'absolute', top: arrangedComponent.gridX * gridWidth, left: arrangedComponent.gridY * gridHeight + horizontalOffset }}>{ifgc}</div>)
  }

  return (
    <div>
      {arrangement}
    </div>
  );
}

export default sizeMe()(ComponentsView)