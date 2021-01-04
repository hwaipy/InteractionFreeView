import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import IFWorkerInstance from "../service/IFWorker"

const worker = IFWorkerInstance()

function ServiceTable(props) {
  useState("standard");
  useState("100%");
  useState("");
  const columns = []
  if (props.isService) columns.push('Service')
  columns.push({
    name: "Address",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          formatAddress(value)
        );
      },
    }
  });
  if (props.isService) columns.push({
    name: "Interfaces",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          formatInterfaces(value)
        );
      },
    }
  });
  columns.push({
    name: "OnTime",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          formatOnTime(value)
        );
      },
    }
  });
  [['Received', 'B'], ['Received Message', 'S'], ['Sent', 'B'], ['Sent Message', 'S'], ['Received/s', 'Bps'], ['Received Message/s', 'Sps'], ['Sent/s', 'Bps'], ['Sent Message/s', 'Sps']].forEach(items =>
    columns.push({
      name: items[0],
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            formatDataSize(value, items[1], items[1] === 'Bps')
          );
        },
      }
    }))

  const options = {
    filter: false,
    print: false,
    download: false,
    hint: true,
    selectableRows: 'none',
    rowsPerPage: 100,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
      return (
        <></>
      );
    },
  };

  function prepareDataRow(line) {
    const previousMeta = props.previousDataRef.previousData[line.Address]
    const deltaTime = (Date.now() - props.previousDataRef.previousDataTime) / 1000.0
    const row = []
    if (props.isService) row.push(line.ServiceName)
    row.push(line.Address)
    if (props.isService) row.push(line.Interfaces)
    row.push(line.OnTime)
    row.push(line.Statistics['Received Bytes'])
    row.push(line.Statistics['Received Message'])
    row.push(line.Statistics['Sent Bytes'])
    row.push(line.Statistics['Sent Message'])
    row.push((previousMeta ? (line.Statistics['Received Bytes'] - previousMeta.Statistics['Received Bytes']) : 0) / deltaTime)
    row.push((previousMeta ? (line.Statistics['Received Message'] - previousMeta.Statistics['Received Message']) : 0) / deltaTime)
    row.push((previousMeta ? (line.Statistics['Sent Bytes'] - previousMeta.Statistics['Sent Bytes']) : 0) / deltaTime)
    row.push((previousMeta ? (line.Statistics['Sent Message'] - previousMeta.Statistics['Sent Message']) : 0) / deltaTime)
    return row
  }
  const data = props.meta.map(line => prepareDataRow(line))
  props.previousDataRef.previousData = {}
  props.meta.forEach(line => props.previousDataRef.previousData[line.Address] = line)
  props.previousDataRef.previousDataTime = Date.now()

  return (
    <React.Fragment>
      <MUIDataTable title={props.title} data={data} columns={columns} options={options} />
    </React.Fragment>
  );
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serviceMeta: [], nonserviceMeta: [] };
    this.previousRefServices = {
      previousData: {},
      previousDataTime: Date.now()
    }
    this.previousRefNonServices = {
      previousData: {},
      previousDataTime: Date.now()
    }

    this.fetching = false
    const loop = async () => {
      while (true) {
        if (this.fetching) await this.doMetaFetch(this)
        await new Promise(r => setTimeout(r, 2000));
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
    const data = await worker.listServiceMeta()
    const services = data.filter(row => row.ServiceName !== "")
    const nonservices = data.filter(row => row.ServiceName === "")
    this.setState({ serviceMeta: services, nonserviceMeta: nonservices })
  }

  render() {
    return (
      <div>
        <ServiceTable meta={this.state.serviceMeta} title='Services' isService={true} previousDataRef={this.previousRefServices}></ServiceTable>
        <div style={{ height: 30 }}></div>
        <ServiceTable meta={this.state.nonserviceMeta} title='Non Services' isService={false} previousDataRef={this.previousRefNonServices}></ServiceTable>
        <div style={{ height: 30 }}></div>
      </div>
    );
  }
}

export default Dashboard

function formatOnTime(onTime) {
  if (onTime / 86400 >= 2) return '' + Math.floor(onTime / 86400) + ' days'
  if (onTime / 86400 >= 1) return '' + Math.floor(onTime / 86400) + ' day'
  if (onTime / 3600 >= 2) return '' + Math.floor(onTime / 3600) + ' hours'
  if (onTime / 3600 >= 1) return '' + Math.floor(onTime / 3600) + ' hour'
  if (onTime / 60 >= 2) return '' + Math.floor(onTime / 60) + ' minutes'
  if (onTime / 60 >= 1) return '' + Math.floor(onTime / 60) + ' minute'
  if (onTime >= 2) return '' + Math.floor(onTime) + ' seconds'
  return '' + Math.floor(onTime) + ' second'
}

function formatDataSize(v, unit, roundLow = true) {
  if (v >= 1e12) return '' + ((v / 1e12).toPrecision(3)) + ' T' + unit
  if (v >= 1e9) return '' + ((v / 1e9).toPrecision(3)) + ' G' + unit
  if (v >= 1e6) return '' + ((v / 1e6).toPrecision(3)) + ' M' + unit
  if (v >= 1e3) return '' + ((v / 1e3).toPrecision(3)) + ' K' + unit
  return '' + (roundLow ? parseInt(v) : v.toPrecision(3)) + ' ' + unit
}

function formatAddress(address) {
  let formattedAddress = ''
  for (var i = 0; i < address.length; i++) {
    var part = address[i].toString(16)
    if (part.length === 2) formattedAddress += part
    else formattedAddress += '0' + part
    if (i < address.length - 1) formattedAddress += '-'
  }
  return formattedAddress.toUpperCase()
}

function formatInterfaces(interfaces) {
  let result = ''
  for (var i = 0; i < interfaces.length; i++) {
    if (i > 0) result += ', '
    result += '<a href="/protocol/interface/' + interfaces[i] + '">' +
      interfaces[i] + '</a>'
  }
  return result
}
