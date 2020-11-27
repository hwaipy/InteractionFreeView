import React from 'react'
import IFWorkerInstance from "../service/IFWorker"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { Base64 } from 'js-base64'
import Image from 'material-ui-image'

const worker = IFWorkerInstance(false)

const defaultOrder = ['LJ', 'NS', 'NE', 'DLH', 'BJ', 'SH', 'MTR', 'FZ', 'JN', 'QD', 'XM', 'CC', 'WeiH', 'RUS', 'AL']

function App(props) {
  let figData = props['weatherData']
  let figDataMap = {}
  figData.forEach(d => { figDataMap[d['LocationAbbr']] = d })
  let fetchedAbbrs = figData.map(d => { return d['LocationAbbr'] })
  let orderedAbbr = defaultOrder.filter(abbr => { return fetchedAbbrs.includes(abbr) }).concat(fetchedAbbrs.filter(abbr => { return !defaultOrder.includes(abbr) }))
  return (
    <>
      <CRow>
        {
          orderedAbbr.map(abbr => { return figDataMap[abbr] }).filter(fig => { return fig['Content'] }).map((fig) => {
            let imgData = fig['Content']
            let base64 = Base64.fromUint8Array(imgData)
            return (
              <CCol xs="12" sm="6" md="6" lg="4" xl="3" key={fig['LocationAbbr']}>
                <CCard>
                  <CCardHeader>
                    {fig['Location']}
                    {/* <div className="card-header-actions">
                      <CLink className="card-header-action">
                        <CIcon name="cil-settings" />
                      </CLink>
                      <CLink className="card-header-action" onClick={() => hehe()}>
                        <CIcon name='cil-chevron-bottom' />
                      </CLink>
                      <CLink className="card-header-action" onClick={() => hehe()}>
                        <CIcon name="cil-x-circle" />
                      </CLink>
                    </div> */}
                  </CCardHeader>
                  <CCardBody className="p-0">
                    <Image src={`data:image/png;base64,${base64}`} aspectRatio={2.5217391304} id={'IMG_' + fig['LocationAbbr']} />
                  </CCardBody>
                </CCard>
              </CCol>
            )
          })
        }
      </CRow>
    </>
  );
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weatherData: [] };

    this.fetching = false
    const loop = async () => {
      while (true) {
        if (this.fetching) await this.doWeatherFetch(this)
        await new Promise(r => setTimeout(r, 3600000));
      }
    }
    loop()
  }

  componentDidMount() {
    this.fetching = true
    this.doWeatherFetch()
  }

  componentWillUnmount() {
    this.fetching = false
  }

  async doWeatherFetch() {
    let data = await worker.WeatherViewer.latest()
    let weatherData = data['Data']
    this.setState({ weatherData: weatherData })
  }

  render() {
    return (
      <App weatherData={this.state.weatherData}></App>
    );
  }
}

export default Weather
