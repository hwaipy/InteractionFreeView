import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";
import IFWorkerInstance from "../service/IFWorker"

const worker = IFWorkerInstance(true)

function App(props) {
  useState("standard");
  useState("100%");
  useState("");

  const columns = [
    "Service",
    {
      name: "Address",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            formatAddress(value)
          );
        },
      }
    },
    {
      name: "Interfaces",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            formatInterfaces(value)
          );
        },
      }
    },
    {
      name: "OnTime",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            formatOnTime(value)
          );
        },
      }
    },
  ];

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

  let data = props.meta

  return (
    <React.Fragment>
      <MUIDataTable title={"Services"} data={data} columns={columns} options={options} />
    </React.Fragment>
  );
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meta: [] };

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
    let data = await worker.listServiceMeta()
    this.setState({ meta: data })
  }

  render() {
    return (
      <App meta={this.state.meta}></App>
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
