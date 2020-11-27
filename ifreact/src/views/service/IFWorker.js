import IFWorker from './../../interactionfree'

const domainMap = {
    'localhost': 20082,
    '192.168.25.5': 82,
    '172.16.60.200': 82,
    'interactionfree.cn': 82,
}
const sslDomainMap = {
    'localhost': 20081,
    '192.168.25.5': 81,
    '172.16.60.200': 81,
    'interactionfree.cn': 81,
}

const currentDomain = window.location.hostname

let plainWorker = undefined
let secureWorker = undefined

function IFWorkerInstance(ssl) {
    if (ssl) {
        if (!secureWorker) secureWorker = IFWorker("wss://" + currentDomain + ":" + sslDomainMap[currentDomain] + "/ws/")
        return secureWorker
    } else {
        if (!plainWorker) plainWorker = IFWorker("ws://" + currentDomain + ":" + domainMap[currentDomain] + "/ws/")
        return plainWorker
    }
 
}

export default IFWorkerInstance