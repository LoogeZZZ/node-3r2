const zmq = require('zeromq');
const subscriber = zmq.socket('sub')
subscriber.connect('tcp://localhost:3000')

subscriber.subscribe('')

subscriber.on('message', data => {
    const message = JSON.parse(data)
    const date = new Date(message.timestamp)
    console.log(`Файл ${message.file} изменён ${date}`);
})

