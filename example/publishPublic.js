const Mam = require('../lib/mam.client.js')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

// Initialise MAM State - PUBLIC
let mamState = Mam.init('https://nodes.devnet.thetangle.org:443')

// Callback used to pass data out of the fetch
const logData = data => console.log(JSON.parse(trytesToAscii(data)))

// Publish to tangle
const publish = async packet => {
    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)
    // Save new mamState
    mamState = message.state
    // Attach the payload.
    await Mam.attach(message.payload, message.address)

    // Fetch Stream Async to Test
    const resp = await Mam.fetch(message.root, 'public', null, logData)

    console.log(resp, message.root)
}

publish('POTATO ONE')
publish('POTATO TWO')
publish('POTATO THREE')
