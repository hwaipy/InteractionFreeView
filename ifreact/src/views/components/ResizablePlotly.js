import React from 'react'
import Plot from 'react-plotly.js';
import sizeMe from 'react-sizeme'

class ResizablePlotly extends React.Component {
  render() {
    const { width, height } = this.props.size
    const layout = Object.assign(Object.assign({}, this.props.layout ? this.props.layout : {}), { autosize: false, width: width, height: height })
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Plot data={this.props.data} layout={layout} useResizeHandler={false} />
      </div>
    );
  }
}

export default sizeMe()(ResizablePlotly)