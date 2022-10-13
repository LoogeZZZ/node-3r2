const zmq = require('zeromq');
const subscriber = zmq.socket('sub')
subscriber.connect('tcp://localhost:3000')

subscriber.subscribe('ByDate')

subscriber.on('message', (topic ,data) => {
    const message = JSON.parse(data)
    const date = new Date(message.timestamp)
    console.log(`Файл изменён ${date}`);
})

