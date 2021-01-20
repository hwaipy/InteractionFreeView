import React from 'react'
import IFWorkerInstance from "../../service/IFWorker"
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap'

const worker = IFWorkerInstance()

function Dev(props) {
  const dev = props.dev
  const protection = parseFloat(dev.protection)
  function onCheckChange(evt) {
    props.onOutputStatusChange(dev.devID, dev.channel, evt.target.checked)
  }

  function onVChange(evt) {
    const value = parseFloat(evt.target.value)
    if (value >= 0 && value <= protection) {
      props.onVoltageSetpointChange(dev.devID, dev.channel, value)
    }
  }

  return (
    <Card>
      <Card.Header>{dev.devID + "-" + dev.channel}</Card.Header>
      <Card.Body>
        <Form inline>
          <Form.Row>
            <Form.Check className="mt-2" type="switch" id={"custom-switch" + dev.devID + "-" + dev.channel} checked={dev.on} onChange={onCheckChange} />
            <Form.Control className="mb-2 ml-3 mr-sm-2" id={"V" + dev.devID + "-" + dev.channel} value={dev.voltageSetpoint.toFixed(3)} onChange={onVChange} />
            <Form.Label className="mb-2 mr-2 text-center" htmlFor="inlineFormCustomSelectPref">
              V
            </Form.Label>
            <Form.Control className="mb-2 mr-sm-2" id={"I" + dev.devID + "-" + dev.channel} value={dev.currentReading} readOnly={true} />
            <Form.Label className="mb-2 my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
              A
            </Form.Label>
          </Form.Row>
        </Form>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{"[<" + protection + "V] " + dev.description}</small>
      </Card.Footer>
    </Card>
  );
}

const deviceIDs = ["TF_PowerSupply_Alice_1", "TF_PowerSupply_Alice_2", "TF_PowerSupply_Alice_3", "TF_PowerSupply_Alice_4", "TF_PowerSupply_Bob_1", "TF_PowerSupply_Bob_2", "TF_PowerSupply_Bob_3", "TF_PowerSupply_Bob_4"]
const deviceDefines = {
  "TF_PowerSupply_Alice_1": {
    0: {
      description: "Alice 风扇电源",
      protection: 25
    },
    1: {
      description: "Alice AWG 电源",
      protection: 13
    },
    2: {
      description: "Alice 时钟板电源",
      protection: 6
    }
  },
  "TF_PowerSupply_Alice_2": {
    0: {
      description: "Alice Bias AM1",
      protection: 15
    },
    1: {
      description: "Alice Bias AM2",
      protection: 15
    },
    2: {
      description: "Alice Bias Ground",
      protection: 6
    }
  },
  "TF_PowerSupply_Alice_3": {
    0: {
      description: "Alice Bias AM3",
      protection: 15
    },
    1: {
      description: "~",
      protection: 30
    },
    2: {
      description: "~",
      protection: 6
    }
  },
  "TF_PowerSupply_Alice_4": {
    0: {
      description: "Alice PM 放大器供电",
      protection: 6
    },
    1: {
      description: "Alice AM 放大器 Vbias",
      protection: 13
    },
    2: {
      description: "Alice AM 放大器 Vamp",
      protection: 1.5
    }
  },
  "TF_PowerSupply_Bob_1": {
    0: {
      description: "Bob AWG 电源",
      protection: 13
    },
    1: {
      description: "Bob 风扇电源",
      protection: 25
    },
    2: {
      description: "Bob 时钟板电源",
      protection: 6
    }
  },
  "TF_PowerSupply_Bob_2": {
    0: {
      description: "Bob PM 放大器供电",
      protection: 6
    },
    1: {
      description: "Bob AM 放大器 Vbias",
      protection: 13
    },
    2: {
      description: "Bob AM 放大器 Vamp",
      protection: 1.5
    }
  },
  "TF_PowerSupply_Bob_3": {
    0: {
      description: "Bob Bias AM1",
      protection: 15
    },
    1: {
      description: "Bob Bias AM2",
      protection: 15
    },
    2: {
      description: "Bob Bias Ground",
      protection: 6
    }
  },
  "TF_PowerSupply_Bob_4": {
    0: {
      description: "Bob Bias AM3",
      protection: 15
    },
    1: {
      description: "~",
      protection: 30
    },
    2: {
      description: "~",
      protection: 6
    }
  },
}

function AWGTriggerControl(props) {
  return (
    <Card>
      <Card.Header>{"AWG Trigger Control"}</Card.Header>
      <Card.Body>
        <Button variant="outline-primary" onClick={(e) => props.onRestartTrigger(e, 'Alice')}>Restart Trigger Alice</Button>{' '}
        <Button variant="outline-primary" onClick={(e) => props.onRestartTrigger(e, 'Bob')}>Restart Trigger Bob</Button>{' '}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">AWG 断电或 reset 后，需重发 trigger</small>
      </Card.Footer>
    </Card>
  );
}

class DevStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { devs: [] };
    this.updating = false
    const loop = async () => {
      while (true) {
        if (this.updating) await this.doMetaFetch(this)
        await new Promise(r => setTimeout(r, 1000));
      }
    }
    loop()
  }

  componentDidMount() {
    this.updating = true
    this.doMetaFetch()
  }

  componentWillUnmount() {
    this.updating = false
  }

  async doMetaFetch() {
    const futures = deviceIDs.map(devID => [worker[devID].getVoltageSetpoints(), worker[devID].measureCurrents(), worker[devID].getOutputStatuses()])
    const devs = []
    for (const iDev of [...Array(deviceIDs.length).keys()]) {
      const futureList = futures[iDev]
      const result = []
      for (const future of futureList) {
        result.push(await future)
      }
      for (const ch of [...Array(result[0].length).keys()]) {
        devs.push({
          devID: deviceIDs[iDev],
          channel: ch,
          voltageSetpoint: result[0][ch],
          currentReading: result[1][ch],
          on: result[2][ch],
          description: deviceDefines[deviceIDs[iDev]][ch].description,
          protection: deviceDefines[deviceIDs[iDev]][ch].protection,
        })
      }
    }
    this.setState({ devs: devs })
  }

  onOutputStatusChange(devID, channel, status) {
    worker[devID].setOutputStatus(channel, status)
    this.doMetaFetch()
  }

  onVoltageSetpointChange(devID, channel, value) {
    worker[devID].setVoltage(channel, value)
    this.doMetaFetch()
  }

  onRestartTrigger(evt, target) {
    console.log(target)
    let a = worker['USTCAWG_' + target].sendTrigger(0.2e-3, 60000, 0.2e-3, 60000)
    console.log(a)
  }

  render() {
    const devs = this.state.devs
    return (
      <Container>
        <Row>
          {devs.map(dev =>
            <Col key={dev.devID + "-" + dev.channel} xs={12} sm={12} md={12} lg={12} xl={6}>
              <Dev dev={dev} onOutputStatusChange={(this.onOutputStatusChange).bind(this)} onVoltageSetpointChange={(this.onVoltageSetpointChange).bind(this)}></Dev>
            </Col>
          )}
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={6}>
            <AWGTriggerControl onRestartTrigger={this.onRestartTrigger}></AWGTriggerControl>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DevStatus