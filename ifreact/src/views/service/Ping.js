import React from 'react'
import {
    EventEmitter
} from 'events';
import IFWorkerInstance from './IFWorker'
import { CTooltip } from '@coreui/react'

const worker = IFWorkerInstance(false)

class Ping {
    constructor() {
        this.ping = -1
        this.events = new EventEmitter()
        this.pingLoop()
    }

    on(func) {
        this.events.on('ping', func)
    }

    off(func) {
        this.events.off('ping', func)
    }

    async pingLoop() {
        async function doPing() {
            try {
                let t1 = new Date().getTime();
                let protocol = await worker.protocol();
                if (protocol === "IF1") {
                    let deltaT = new Date().getTime() - t1
                    return deltaT
                } else {
                    return -1
                }
            } catch (error) {
                return -1
            }
        }
        while (true) {
            await new Promise(r => setTimeout(r, 3000));
            this.ping = await doPing(this)
            this.events.emit('ping', this.ping)
        }
    }
}

const ping = new Ping()

class PingDot extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ping: ping.ping };
    }

    componentDidMount() {
        ping.on((this.pinged).bind(this))
    }

    componentWillUnmount() {
        ping.off((this.pinged).bind(this))
    }

    pinged(delay) {
        this.setState({
            ping: delay
        })
    }

    render() {
        let delay = this.state.ping / 2;
        let color = "danger";
        let delayText = parseInt(delay) + " ms"
        if (delay < 0) {
            color = "dark"
            delayText = "offline"
        } else if (delay < 20) color = "success"
        else if (delay < 100) color = "warning"
        return (
            <CTooltip content={delayText} placement={"right"}      >
                <span className={"mb-0 text-" + color}>⬤</span>
            </CTooltip>
        );
    }
}

export { ping, PingDot }