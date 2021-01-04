import React from 'react'
import IFWorkerInstance from "../../service/IFWorker"
import { TDCStorageStreamFetcher, linspace, Histogram } from "../../../lib/IFExp"
import _ from 'lodash'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import Paper from '@material-ui/core/Paper';
// import ButtonBase from '@material-ui/core/ButtonBase';
import ResizablePlotly from '../../components/ResizablePlotly'
import CounterField from '../../components/CounterField'
import InformationField from '../../components/InformationField'

const worker = IFWorkerInstance()
// var parameterString = window.location.search
// var parameters = {}
// if (parameterString.length > 0) {
//   parameterStrings = parameterString.split('?')[1].split('&')
//   for (var i = 0; i < parameterStrings.length; i++) {
//     paras = parameterStrings[i].split('=')
//     if (paras.length == 2) parameters[paras[0]] = paras[1]
//   }
// }
// tdcService = parameters['tdcservice'] || null
// collection = parameters['collection'] || null
const collection = 'TDCServerTestCollection' //'TFQKD_TDC'

//   if (tdcService != null) {
//     collection = await worker[tdcService].getStoraCollectionName()
//     tdcConfiger = new TDCConfiger(worker, tdcService)
//     tdcConfiger.start()
//   }
//   initControlPanel(channelCount)

function listener() {
  console.log('listener')
}

const cardStyles = makeStyles({
  root: {
    backgroundColor: "#F7F7F7",
  },
});

function CounterCard(props) {
  return (
    <Card className={cardStyles().root} variant="outlined">
      <CardHeader title='Channels' />
      <CardContent>
        <Grid container spacing={1}>
          {
            _.range(props.counts.length).map(i =>
              <Grid item xs={12} key={'' + i}>
                <CounterField channel={i} count={props.counts[i]} delay={props.delays[i]}></CounterField>
              </Grid>
            )
          }
        </Grid>
      </CardContent>
    </Card>
  );
}

class HistogramCard extends React.Component {
  constructor(props) {
    super(props)
    this.histograms = {}
  }

  render() {
    var layout = {
      xaxis: { title: 'Time (ns)' },
      yaxis: { title: 'Count' },
      margin: { l: 50, r: 30, b: 50, t: 30, pad: 4 },
    }
    layout['updatemenus'] = [
      {
        buttons: [
          { args: ['yaxis.type', 'linear'], label: 'Linear', method: 'relayout' },
          { args: ['yaxis.type', 'log'], label: 'Log', method: 'relayout' }
        ],
        direction: 'left', pad: { 'r': 10, 't': 10 }, showactive: true, type: 'buttons', x: 0.1, xanchor: 'left', y: 1.1, yanchor: 'top'
      }
    ]

    // // get current layout status: linear or log
    // var gd = document.getElementById('viewport')
    // var oldLayout = gd.layout
    // if (oldLayout && result != null) {
    //   currentY = (gd.layout['yaxis']['type'])
    //   layout['yaxis']['type'] = currentY
    // }

    const traces = []
    if (this.props.histograms) {
      const xs = linspace(this.props.from, this.props.to / this.props.divide, this.props.binNum)
      // let histogramXsMatched = true
      for (var i = 0; i < this.props.signals.length; i++) {
        const channelNum = this.props.signals[i]
        if (!this.histograms[channelNum.toString()]) this.histograms[channelNum.toString()] = new Histogram()
        const histogram = this.histograms[channelNum]
        if (this.props.append) histogram.append(xs, this.props.histograms[i])
        else histogram.update(xs, this.props.histograms[i])
        let channelNumStr = this.props.signals[i].toString()
        if (channelNumStr.length === 1) channelNumStr = "0" + channelNumStr
        traces.push({
          x: histogram.xs,
          y: histogram.ys,
          type: 'scatter',
          name: 'CH' + channelNumStr
        })
        // histogramXsMatched &= histogram.xsMatch
      }
      layout['uirevision'] = 'true'
      //     listener('HistogramXsMatched', histogramXsMatched)
    }
    const contents = [
      <InformationField title='Trigger' value={this.props.trigger}></InformationField>,
      <InformationField title='Divide' value={this.props.divide}></InformationField>,
      <InformationField title='BinNum' value={this.props.binNum}></InformationField>,
      <InformationField title='From' value={this.props.from} tail='ns'></InformationField>,
      <InformationField title='To' value={this.props.to} tail='ns'></InformationField>,
    ]
    return (
      <Card style={{ backgroundColor: '#F7F7F7' }} variant="outlined">
        <CardHeader title='Histogram' />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {_.range(contents.length).map(i => <Grid item xs={12} sm={12} md={6} lg={3} xl={2} key={'CCR' + i}>{contents[i]}</Grid>)}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ResizablePlotly data={traces} layout={layout}></ResizablePlotly>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

class TDCViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counts: [0, 0, 0, 0],
      delays: [0, 0, 0, 0],
      isAppend: false,
      reviewMode: 'instant',
    };
    this.fetcher = null
  }

  componentDidMount() {
    this.fetcher = new TDCStorageStreamFetcher(worker, collection, 500, {
      'Data.Counter': 1,
      'Data.MultiHistogram': 1,
      'Data.Delays': 1,
    }, (this.plot).bind(this), listener)
    this.fetcher.start()
  }

  componentWillUnmount() {
    this.fetcher.stop()
    this.fetcher = null
  }

  handleToggleChange(event, value) {
    if (value) {
      this.setState({ reviewMode: value })
    }
  }

  // function updateIntegralData() {
  //   var beginTime = onBlurIntegralRange('input-integral-from')
  //   var endTime = onBlurIntegralRange('input-integral-to')
  //   invalid = $("#input-integral-from")[0].classList.contains('is-invalid') ||
  //     $("#input-integral-to")[0].classList.contains('is-invalid')
  //   var isToNow = $("#input-integral-to")[0].value
  //   var isToNow = isToNow.length == 0 || isToNow.toLowerCase() == 'now'
  //   if (!invalid) fetcher.updateIntegralData(beginTime, endTime, isToNow)
  //   setHistogramConfigEditable(isToNow)
  // }

  // onSelectionReview(isReview) {
  //   $("#selection-instant").attr("class", isIntegral ? "btn btn-secondary" :
  //     "btn btn-success")
  //   $("#selection-integral").attr("class", isIntegral ? "btn btn-success" :
  //     "btn btn-secondary")
  //   $("#IntegralConfig").collapse(isIntegral ? "show" : "hide")
  //   fetcher.changeMode(isIntegral ? "Stop" : "Instant")
  //   setHistogramConfigEditable(true)
  // }

  render() {
    return (
      <div>
        <Box className="mb-2">
          {/* <CButtonGroup className="mr-2">
            <CButton color="secondary">1</CButton>
            <CButton color="secondary">2</CButton>
            <CButton color="secondary">3</CButton>
            <CButton color="secondary">4</CButton>
          </CButtonGroup> */}
          <ToggleButtonGroup value={this.state.reviewMode} exclusive onChange={(this.handleToggleChange).bind(this)} aria-label="text alignment">
            <ToggleButton value="instant" style={{ outline: 'none' }}>Instant</ToggleButton>
            <ToggleButton value="review" style={{ outline: 'none' }}>Review</ToggleButton>
          </ToggleButtonGroup>
          <ButtonGroup value={this.state.reviewMode} exclusive onChange={(this.handleToggleChange).bind(this)} aria-label="text alignment" style={{marginLeft: 10}}>
            <Button value="instant" style={{ outline: 'none' }}>Instant</Button>
            <Input></Input>
          </ButtonGroup>
          {/* <CInputGroup classname='ml-5'>
            <CInputGroupPrepend>
              <CInputGroupText>@</CInputGroupText>
            </CInputGroupPrepend>
            <CInput placeholder="Input group example" />
          </CInputGroup> */}
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={7} md={6} lg={4} xl={3}>
            <CounterCard counts={this.state.counts} delays={this.state.delays}></CounterCard>
          </Grid>
          <Grid item xs={12} sm={5} md={6} lg={8} xl={9}>
            <HistogramCard histograms={this.state.histograms} trigger={this.state.syncChannel} signals={this.state.signalChannels} divide={this.state.divide} binNum={this.state.length} from={this.state.viewFrom} to={this.state.viewTo}></HistogramCard>
          </Grid>
        </Grid>
      </div>
    );
  }

  plot(result, append) {
    console.log(result)

    const report = {}
    if (result == null) {
      console.log('nullllllll')
      //     for (var i = 0; i < TDCHistograms.length; i++) {
      //       TDCHistograms[i].clear()
      //     }
      //     traces.push({
      //         x: [0],
      //         y: [0],
      //         type: 'scatter',
      //         name: 'CH0'
      //       })
      //       // $('#HistogramWarning')[0].classList.add('d-none')

      //      Plotly.react('viewport', traces, layout, {
      //       displaylogo: false,
      //       // responsive: true
      //     })
    } else {
      const counts = result.Data.Counter
      report.counts = _.range(Math.max(...(Object.keys(counts).map(k => parseInt(k)).filter(n => !isNaN(n)))) + 1).map(i => counts[i])
      report.delays = result.Data.Delays
      const data = result.Data.MultiHistogram
      const configuration = data.Configuration
      report.histograms = data.Histograms
      report.viewFrom = configuration.ViewStart / 1000.0
      report.viewTo = configuration.ViewStop / 1000.0
      report.divide = configuration.Divide
      report.length = configuration.BinCount
      report.syncChannel = configuration.Sync
      report.signalChannels = configuration.Signals
      report.isAppend = append
    }
    this.setState(report)
  }
}

export default TDCViewer



























































// tdcConfiger = null
// channelCount = 16

// class TDCConfiger {
//   constructor(worker, tdcService) {
//     this.worker = worker
//     this.tdcService = tdcService
//     this.delayPaneInited = false
//     this.editingField = null
//     this.recentDelays = null
//   }

//   start() {
//     this.updateDelays()
//   }

//   async updateDelays() {
//     this.recentDelays = await worker[tdcService].getDelays()
//     if (!this.delayPaneInited) {
//       this.delayPaneInited = true
//     }
//     for (var i = 0; i < this.recentDelays.length; i++) {
//       if ('' + i != this.editingField) $('#DPTI_' + i).val('' + this.recentDelays[
//         i] / 1000.0)
//     }
//     var mhResult = await worker[tdcService].getAnalyserConfiguration(
//       'MultiHistogram')
//     if (this.editingField != 'Sync') $('#DPTI_Sync').val(mhResult['Sync'])
//     if (this.editingField != 'ViewStart') $('#DPTI_ViewStart').val(mhResult[
//       'ViewStart'] / 1000.0)
//     if (this.editingField != 'ViewStop') $('#DPTI_ViewStop').val(mhResult[
//       'ViewStop'] / 1000.0)
//     if (this.editingField != 'BinCount') $('#DPTI_BinCount').val(mhResult[
//       'BinCount'])
//     if (this.editingField != 'Divide') $('#DPTI_Divide').val(mhResult[
//       'Divide'])
//     var signals = mhResult['Signals']
//     for (var i = 0; i < this.recentDelays.length; i++) {
//       $('#ChannelPane_' + i).removeClass("border-left-warning")
//       $('#ChannelPane_' + i).removeClass("border-left-success")
//       $('#ChannelPane_' + i).removeClass("border-left-danger")
//       if (i == mhResult['Sync']) {
//         $('#ChannelPane_' + i).addClass("border-left-danger")
//       } else if (signals.includes(i)) {
//         $('#ChannelPane_' + i).addClass("border-left-success")
//       } else {
//         $('#ChannelPane_' + i).addClass("border-left-warning")
//       }
//     }
//     setTimeout(this.updateDelays.bind(this), 1100)
//   }

//   editing(id) {
//     this.editingField = id.split('_')[1]
//   }

//   edited(id) {
//     this.editingField = null
//     var editedField = id.split('_')[1]
//     var editedValue = $('#' + id).val()
//     if (!isNaN(parseInt(editedField))) {
//       // edited a channel delay
//       var editedChannel = parseInt(editedField)
//       var editedDelay = parseFloat(editedValue)
//       if (isNaN(editedDelay)) editedDelay = this.recentDelays[editedChannel] /
//         1000.0
//       $('#' + id).val('' + editedDelay)
//       worker[tdcService].setDelay(editedChannel, parseInt(editedDelay * 1000))
//     } else {
//       // edited a MultiHistogram config
//       var config = {}
//       var valid = true
//       if (editedField == 'Sync') {
//         config['Sync'] = parseInt(editedValue)
//         valid = !isNaN(config['Sync'])
//       }
//       if (editedField == 'ViewStart' || editedField == 'ViewStop') {
//         config[editedField] = parseFloat(editedValue) * 1000.0
//         valid = !isNaN(config[editedField])
//       }
//       if (editedField == 'BinCount' || editedField == 'Divide') {
//         config[editedField] = parseInt(editedValue)
//         valid = !isNaN(config[editedField])
//       }
//       if (valid) worker[tdcService].configureAnalyser('MultiHistogram', config)
//     }
//   }
// }

// function initControlPanel(channelNum) {
//   temp = $('#DelayPaneTemp')
//   for (var i = 0; i < channelNum; i++) {
//     newItem = temp.clone(true)
//     newItem.removeClass('d-none')
//     newItem.addClass('border-left-warning')
//     newItem.attr('id', 'ChannelPane_' + i)
//     $('#ChannelPane').append(newItem)
//     newItem.find('.DPTT').html('CH ' + (i < 10 ? '0' : '') + i)
//     newItem.find('.DPTT').attr('id', 'DPTT_' + i)
//     newItem.find('.DPTI').attr('id', 'DPTI_' + i)
//     if (tdcConfiger == null) {
//       newItem.find('.DPTI').attr('disabled', 'true')
//     }
//   }
//   temp.remove()

//   temp = $('#HistoPaneTemp')

//   function addHistoPane(title, hasTail, id) {
//     newItem = temp.clone(true)
//     newItem.removeClass('d-none')
//     newItem.addClass('border-left-info')
//     newItem.attr('id', 'HistoPane_' + id)
//     newItem.find('.DPTT').html(title)
//     if (!hasTail) {
//       newItem.find('.DPTTi').addClass('d-none')
//     }
//     newItem.find('.DPTI').attr('id', 'DPTI_' + id)
//     if (tdcConfiger == null) {
//       newItem.find('.DPTI').attr('disabled', 'true')
//     }
//     $('#ViewPanel').append(newItem)
//   }
//   addHistoPane('Trigger', false, 'Sync')
//   addHistoPane('Divide', false, 'Divide')
//   addHistoPane('BinNum', false, 'BinCount')
//   addHistoPane('From', true, 'ViewStart')
//   addHistoPane('To', true, 'ViewStop')
//   temp.remove()

//   temp = $('#DetailPaneTemp')

//   function addDetailPane(title, hasTail, id) {
//     newItem = temp.clone(true)
//     newItem.removeClass('d-none')
//     newItem.addClass('border-left-info')
//     newItem.attr('id', 'DetailPane_' + id)
//     newItem.find('.DPTT').html(title)
//     if (!hasTail) {
//       newItem.find('.DPTTi').addClass('d-none')
//     }
//     newItem.find('.DPTI').attr('id', 'DePTI_' + id)
//     newItem.find('.DPTI').attr('disabled', 'true')
//     $('#DetailPanel').append(newItem)
//   }
//   addDetailPane('Count 4/8', false, 'Ratio48')
//   addDetailPane('Count 5/9', false, 'Ratio59')
//   temp.remove()
// }

// function onTDCConfigInputFocus(id, isBlur) {
//   if (isBlur) tdcConfiger.edited(id)
//   else tdcConfiger.editing(id)
// }

// TDCHistograms = new Array(channelCount)
// for (var i = 0; i < TDCHistograms.length; i++) {
//   TDCHistograms[i] = new Histogram()
// }

// function toggleChannelStatus(id) {
//   if (tdcConfiger == null) return
//   id = id.split('_')[1]
//   if ($('#ChannelPane_' + id).hasClass('border-left-danger')) return
//   isOpen = $('#ChannelPane_' + id).hasClass('border-left-success')
//   $('#ChannelPane_' + id).removeClass('border-left-success')
//   $('#ChannelPane_' + id).removeClass('border-left-warning')
//   $('#ChannelPane_' + id).addClass('border-left-' + (isOpen ? 'warning' :
//     'success'))

//   signals = []
//   for (var i = 0; i < channelCount; i++) {
//     if ($('#ChannelPane_' + i).hasClass('border-left-success')) {
//       signals.push(i)
//     }
//   }
//   worker[tdcService].configureAnalyser('MultiHistogram', {
//     'Signals': signals
//   })
// }

// function setHistogramConfigEditable(editable) {
//   if (tdcConfiger == null) return
//   if (editable) {
//     $('#HistoPane').find('.DPTI').removeAttr('disabled')
//   } else {
//     $('#HistoPane').find('.DPTI').attr('disabled', 'true')
//   }
// }

// function onBlurIntegralRange(id) {
//   element = $("#" + id)[0]
//   text = element.value
//   isNow = false
//   if (text.length == 0 || text.toLowerCase() == "now") {
//     parsedDate = new Date()
//     isNow = (id == 'input-integral-to')
//   } else parsedDate = parseSimpleDate(text)
//   classList = element.classList
//   if (parsedDate) {
//     classList.remove('is-invalid')
//     if (!isNow) element.value = dateToString(parsedDate)
//   } else {
//     classList.add('is-invalid')
//   }
//   return parsedDate
// }

// function listener(event, arg) {
//   if (event == 'FetchTimeDelta') {
//     fetchTimeDelta = arg
//     if (fetchTimeDelta > 3000) {
//       $('#HistogramWarning')[0].classList.remove('d-none')
//       $('#HistogramWarningContent').html("The most recent data was fetched " +
//         parseInt(fetchTimeDelta / 1000) + " s ago.")
//     } else {
//       $('#HistogramWarning')[0].classList.add('d-none')
//     }
//   } else if (event == 'FetchingProgress') {
//     progress = parseInt(arg * 100)
//     $('#FetchingProgress').attr('style',
//       'background-image: linear-gradient(to right, #BDE6FF ' + (progress) +
//       '%, #F8F9FC ' + (progress) + '%)')
//   } else if (event == 'FetchingNumber') {
//     if (arg == null) {
//       $('#FetchNumberContent').html('')
//       $('#FetchNumber')[0].classList.add('d-none')
//     } else {
//       integralFetchedDataCount = arg[0]
//       integralTotalDataCount = arg[1]
//       integralTime = arg[2]
//       content = integralTotalDataCount + ' items (in ' + integralTime + ' s)'
//       if (integralFetchedDataCount < integralTotalDataCount) content =
//         integralFetchedDataCount + ' / ' + content
//       $('#FetchNumber')[0].classList.remove('d-none')
//       $('#FetchNumberContent').html(content)
//     }
//   } else if (event == 'HistogramXsMatched') {
//     if (!arg) {
//       $('#HistogramError')[0].classList.remove('d-none')
//       $('#HistogramErrorContent').html("Histogram Config Not Matched.")
//     } else {
//       $('#HistogramError')[0].classList.add('d-none')
//     }
//   } else if (event == 'TooManyRecords') {
//     if (arg) {
//       $('#TooManyRecordsError')[0].classList.remove('d-none')
//       $('#TooManyRecordsErrorContent').html("Too Many Records.")
//     } else {
//       $('#TooManyRecordsError')[0].classList.add('d-none')
//     }
//   } else {
//     console.log(event + ', ' + arg);
//   }
// }