const zmq = require('zeromq');
const puller = zmq.socket('pull')

puller.on('message', msg => {
    console.log("Получено новое сообщение! " + msg);
})

puller.connect('tcp://localhost:3000')