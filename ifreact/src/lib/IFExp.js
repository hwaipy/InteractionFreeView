class TDCStorageStreamFetcher {
  constructor(worker, collection, updateInterval, filter, ploter, listener) {
    this.worker = worker
    this.collection = collection
    this.updateInterval = updateInterval
    // this.updateRangedResultInterval = 50
    this.lastTime = null
    this.mode = 'Instant' // modes: Instant, Integral, IntegralContinues
    this.filter = filter
    this.fetchID = 0
    this.ploter = ploter
    // this.integralTime = 0
    // this.integralBeginTime = null
    // this.integralEndTime = null
    // this.integralMostRecentTime = null
    // this.integralFetchedDataCount = 0
    // this.integralTotalDataCount = 0
    // this.integralContinuesHasNew = false
    this.listener = listener
    // this.rangedResultQueue = []
    // this.ploter(null, false)
    this.running = true
  }

  start() {
    this.updateLoop()
    //   this.update()
    //   this.updateRangedResult()
  }
  
  stop() {
    this.running = false
  }

  async updateLoop() {
    while (this.running) {
      await new Promise(r => setTimeout(r, this.updateInterval));
      this.ping = await this.doFetch()
      //     this.events.emit('ping', this.ping)
    }
  }

  async doFetch() {
    try {
      if (this.mode === 'Instant' || this.mode === 'IntegralContinues') {
        let fetchID = this.fetchID
        try {
          let result = (this.mode === 'Instant') ? (await this.worker.Storage.latest(this.collection, 'FetchTime', this.lastTime, this.filter)) : (await this.worker.Storage.first(this.collection, 'FetchTime', this.lastTime, this.filter))
          if (fetchID === this.fetchID) {
            if (result !== null) {
              this.lastTime = result['FetchTime'];
              if (this.mode === 'Instant' || this.mode === 'IntegralContinues') {
                this.updateResult(result)
              }
            }
            if (this.mode === 'IntegralContinues') {
              console.log('unimp')
              //           this.integralTime = parseInt((new Date().getTime() - this.integralBeginTime.getTime()) / 1000)
              //           if (result != null) {
              //             this.integralTotalDataCount += 1
              //             this.integralFetchedDataCount += 1
              //             this.integralContinuesHasNew = true
              //           }
            }
            this.updateFetchingInfo()
          }
        } catch (error) {
          console.log("Error: ")
          console.log(error)
          return -1
        }
      }
      this.updateFetchingInfo()
    } catch (error) {
      return -1
    }
  }

  // async range(beginTime, endTime) {
  //   var fetchID = this.fetchID
  //   this.integralTime = parseInt((endTime.getTime() - beginTime.getTime()) / 1000)
  //   try {
  //     var rangedSummaries = await worker.Storage.range(this.collection, this.dateToISO(
  //         beginTime), this.dateToISO(endTime), 'FetchTime', {'_id': 1}, 1000)
  //     this.integralTotalDataCount += rangedSummaries.length
  //     if (rangedSummaries.length > 1000) {
  //       this.changeMode('Stop')
  //       this.listener('TooManyRecords', true)
  //     } else {
  //       for (var i = 0; i < rangedSummaries.length; i++) {
  //         this.integralMostRecentTime = new Date()
  //         this.integralMostRecentTime.setTime(Date.parse(rangedSummaries[i][
  //           'FetchTime'
  //         ]))
  //         var item = await worker.Storage.get(this.collection,
  //           rangedSummaries[i]['_id'], '_id', this.filter)
  //         this.rangedResultQueue.push([fetchID, item])
  //       }
  //       if (rangedSummaries.length > 0) this.lastTime = rangedSummaries[rangedSummaries.length - 1]['FetchTime']
  //       else this.lastTime = this.dateToISO(beginTime)
  //     }
  //   } catch (error) {
  //     console.log("Error: " + error)
  //   }
  // }

  // updateRangedResult() {
  //   if (this.rangedResultQueue.length > 0) {
  //     var resultSet = this.rangedResultQueue.shift()
  //     if (resultSet[0] == this.fetchID) {
  //       this.integralFetchedDataCount += 1
  //       try{
  //         this.updateResult(resultSet[1])
  //         this.updateFetchingInfo()
  //       } catch(err){
  //         console.log(err);
  //       }
  //     }
  //   }
  //   setTimeout(this.updateRangedResult.bind(this), this.rangedResultQueue.length >
  //     0 ? 0 : this.updateRangedResultInterval)
  // }

  updateResult(result) {
    this.ploter(result, this.mode !== 'Instant')
  }

  updateFetchingInfo() {
    // console.log('updateFetchingInfo')
    //   // Check if display no data warning
    //   var fetchTimeDelta = 0
    //   if (this.mode == 'Instant') {
    //     fetchTimeDelta = new Date().getTime() - Date.parse(this.lastTime)
    //   } else if (this.mode == 'IntegralContinues') {
    //     if (this.integralContinuesHasNew) {
    //       fetchTimeDelta = new Date().getTime() - Date.parse(this.lastTime)
    //     } else {
    //       if (this.integralFetchedDataCount == this.integralTotalDataCount &&
    //         this.integralMostRecentTime != null) {
    //         fetchTimeDelta = new Date().getTime() - this.integralMostRecentTime.getTime()
    //       }
    //     }
    //   }
    //   if (this.mode == 'Integral' || this.mode == 'IntegralContinues') {
    //     if (this.integralFetchedDataCount == 0) {
    //       fetchTimeDelta = 0
    //     }
    //   }
    //   this.listener('FetchTimeDelta', fetchTimeDelta);

    //   // Set prograss
    //   if (this.integralTotalDataCount > 0 && this.integralFetchedDataCount <
    //     this.integralTotalDataCount) {
    //     this.listener('FetchingProgress', this.integralFetchedDataCount * 1.0 /
    //       this.integralTotalDataCount)
    //   } else {
    //     this.listener('FetchingProgress', 0.0)
    //   }

    //   // Set FetchNumber
    //   if (this.mode == 'Integral' || this.mode == 'IntegralContinues') {
    //     this.listener('FetchingNumber', [this.integralFetchedDataCount, this.integralTotalDataCount,
    //       this.integralTime
    //     ])
    //   } else {
    //     this.listener('FetchingNumber', null)
    //   }
  }

  // changeMode(mode) {
  //   if (mode == this.mode) return
  //   if (mode != 'Instant' && mode != 'Integral' && mode !=
  //     'IntegralContinues' && mode != 'Stop') {
  //     console.log('Bad mode: ' + mode)
  //     return
  //   }
  //   this.mode = mode
  //   this.integralTime = 0
  //   this.integralTotalDataCount = 0
  //   this.integralFetchedDataCount = 0
  //   this.integralContinuesHasNew = false
  //   if (mode == 'Instant') this.lastTime = 0
  //   if (mode != 'Stop') this.fetchID += 1
  //   this.ploter(null, false)
  //   this.listener('TooManyRecords', false)
  // }

  // updateIntegralData(beginTime, endTime, isToNow) {
  //   this.integralBeginTime = beginTime
  //   this.integralEndTime = endTime
  //   this.changeMode("Stop")
  //   this.changeMode(isToNow ? "IntegralContinues" : "Integral")
  //   // if (isToNow) this.lastTime = this.dateToISO(endTime)
  //   this.range(beginTime, endTime)
  // }

  // dateToISO(date) {
  //   return dateToString(date).replace(' ', 'T') + '.000000+08:00'
  // }
}

export { TDCStorageStreamFetcher }