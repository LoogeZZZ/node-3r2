const zmq = require('zeromq');
const fs = require('fs');
const filename = process.argv[2]

const publisher = zmq.socket('pub')
publisher.bind('tcp://127.0.0.1:3000', err => {
    if(err) throw err
    console.log("Ожидаю подписчиков!")
})

fs.watchFile(filename, () => {
    const message = JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    })
    console.log(">",message);
    publisher.send(message)
})