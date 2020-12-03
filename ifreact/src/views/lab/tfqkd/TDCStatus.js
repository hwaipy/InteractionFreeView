import React from 'react'
import IFWorkerInstance from "../../service/IFWorker"
import ResizablePlotly from '../components/ResizablePlotly'

const worker = IFWorkerInstance()
const collection = 'TFQKD_TDC'

class TDCStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meta: [] };
    this.fetching = false
    this.layout = {
      xaxis: { title: 'Time' },
      yaxis: { title: 'Execution Time (s)' },
    }

    const loop = async () => {
      while (true) {
        if (this.fetching) await this.doMetaFetch(this)
        await new Promise(r => setTimeout(r, 5000));
      }
    }
    loop()
  }

  componentDidMount() {
    this.fetching = true
    this.doMetaFetch()
  }

  componentWillUnmount() {
    this.fetching = false
  }

  async doMetaFetch() {
    const data = await worker.Storage.latest(collection, 'FetchTime', null, { 'Data.ExecutionTimes': 1 }, 60)
    const executionTimes = data.map(d => d.Data.ExecutionTimes)
    if (data.length > 0) {
      const keys = Object.keys(executionTimes[0])
      const traces = []
      keys.forEach(key => {
        traces.push({
          x: data.map(i => i.FetchTime),
          y: executionTimes.map(i => i[key]),
          type: 'scatter',
          name: key
        })
      })
      this.setState({ executionTimes: traces })
    }
  }

  render() {
    return (
      <div>
        <ResizablePlotly data={this.state.executionTimes} layout={this.layout}></ResizablePlotly>
      </div>
    );
  }
}

export default TDCStatus
