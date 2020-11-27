// import React from 'react'
import {
    EventEmitter
} from 'events';
// import worker from './IFWorker'

class Account {
    constructor() {
        this.signedIn = false
        this.ID = undefined
        this.events = new EventEmitter()
    }

    on(func) {
        this.events.on('account', func)
    }

    off(func) {
        this.events.off('account', func)
    }
}

const account = new Account()

// const pingLoop = async function () {
//     function doPing() {
//         account.signedIn = !account.signedIn
//         account.ID = account.signedIn ? 'Hwaipy' : undefined
//         account.events.emit('account')
//     }
//     while (true) {
//         await new Promise(r => setTimeout(r, 2000));
//         doPing(this)
//     }
// }
// pingLoop()

export default account