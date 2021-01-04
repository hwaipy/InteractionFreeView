import React from 'react'
import {
  Col,
} from 'react-bootstrap'
import {
  IFGrid
} from './BaseComponents'
import sizeMe from 'react-sizeme'

function App(props) {
  const { width, height } = props.size
  const colNum = parseInt(width / 200)
  const horizontalOffset = parseInt((width % 200) / 2)

  const widths = [1500, 1024, 800, 1500, 1024, 800, 1500, 1024, 800, 1500, 1024, 800, 1500, 1024, 800,]
  const components = widths.map(w => <Col><IFGrid key={w} style={{ left: w * 200 }}></IFGrid></Col>)
  const arrangement = []
  let currentColNum = 0
  let currentRowNum = 0
  for (const component of components) {
    if (currentColNum >= colNum) {
      currentColNum = 0
      currentRowNum++
    }
    arrangement.push(<div key={currentRowNum + '-' + currentColNum} style={{ position: 'absolute', top: (200 * currentRowNum) + 'px', left: (200 * currentColNum + horizontalOffset) + 'px' }}>{component}</div>)
    currentColNum++
  }
  // const content = arrange.map(row => <Row key={'r' + (key++)}>
  //   {row.map(item => <Col style={{ padding: '0px' }} key={'c' + (key++)}>{item}</Col>)}
  // </Row>)


  return (
    <div>
      {/* <Card style={{ width: (colNum * 200) + 'px' }}>
        <Card.Body >
          <Container fluid>
            {content}
          </Container>
        </Card.Body>
      </Card> */}

      {/* {
        components.map(c => <div key={'k' + (key)} style={{ position: 'relative', top: '100px' }}>{key++}</div>)
      } */}
      {/* 
      <div key={1} style={{ position: 'absolute', top: '0px', left: '0px' }}>{components[0]}</div>
      <div key={2} style={{ position: 'absolute', top: '0px', left: '200px' }}>{components[0]}</div>
      <div key={3} style={{ position: 'absolute', top: '0px', left: '400px' }}>{components[0]}</div>
      <div key={4} style={{ position: 'absolute', top: '0px', left: '600px' }}>{components[0]}</div>
      <div key={5} style={{ position: 'absolute', top: '200px', left: '0px' }}>{components[0]}</div>
      <div key={6} style={{ position: 'absolute', top: '200px', left: '200px' }}>{components[0]}</div> */}
      {arrangement}
    </div>
  );
}

export default sizeMe()(App)