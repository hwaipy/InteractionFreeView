import React from 'react'
import IFWorkerInstance from "../../service/IFWorker"
import {
  Container,
  Row,
  Col,
  Card,
  Form,
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

const deviceIDs = ["TF_PS_1", "TF_PS_2", "TF_PS_3"]
const deviceDefines = {
  "TF_PS_1": {
    0: {
      description: "Alice 风扇电源",
      protection: 30
    },
    1: {
      description: "Alice AWG 电源",
      protection: 30
    },
    2: {
      description: "Alice 时钟板电源",
      protection: 6
    }
  },
  "TF_PS_2": {
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
  "TF_PS_3": {
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
  }
}

class TDCStatus extends React.Component {
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
      </Container>
    );
  }
}

export default TDCStatus



















    // def setVoltage(self, channel, voltage):
    //     self.__checkChannel(channel)
    //     voltage = self.__trimVoltage(channel, voltage)
    //     self.voltageSetpoints[channel] = voltage
    //     self.scpi.INST.NSEL.write(channel + 1)
    //     self.scpi.VOLT.write('{}V'.format(voltage))

    // def setVoltages(self, voltages):
    //     if len(voltages) is not self.channelCount:
    //         raise DeviceException('Length of voltages do not match the channel number.')
    //     voltages = [self.__trimVoltage(c, voltages[c]) for c in range(0, self.channelCount)]
    //     outputCodeString = ['{}'.format(v) for v in voltages]
    //     outputCode = ', '.join(outputCodeString)
    //     self.scpi.APP.VOLT.write(outputCode)
    //     self.voltageSetpoints = voltages


    // def setOutputStatus(self, channel, status):
    //     self.__checkChannel(channel)
    //     self.scpi.INST.NSEL.write(channel + 1)
    //     self.scpi.OUTP.write(1 if status else 0)

    // def setOutputStatuses(self, outputStatuses):
    //     if len(outputStatuses) != self.getChannelNumber():
    //         raise DeviceException("statuses should have length of {}".format(self.getChannelNumber()))
    //     outputCodeString = ['{}'.format(1 if v else 0) for v in outputStatuses]
    //     outputCode = ', '.join(outputCodeString)
    //     self.scpi.APP.OUT.write(outputCode)
    //     self.outputStatuses = [True if v else False for v in outputStatuses]
