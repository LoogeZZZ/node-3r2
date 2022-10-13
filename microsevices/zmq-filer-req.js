const zmq = require('zeromq');
const filename = process.argv[2]
const requester = zmq.socket('req')
requester.connect('tcp://localhost:3000')

requester.on('message', data => {
    const response = JSON.parse(data)
    console.log('>', response)
})

console.log('Посылаем запрос на ' + filename);
requester.send(JSON.stringify({path: filename}))