import React from 'react'
import { CEmbed } from '@coreui/react'

const currentDomain = window.location.hostname

class App extends React.Component {
  render() {
    return (
      <CEmbed>
        <iframe title='DataTaking' src={"http://" + currentDomain + ":8082/app/mdiqkd_datataking"} />
      </CEmbed>
    );
  }
}

export default App



























































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