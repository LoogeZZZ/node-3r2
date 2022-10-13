const zmq = require('zeromq');
const fs = require('fs');
const responder = zmq.socket('rep')
responder.bind('tcp://127.0.0.1:3000', err => {
    if(err) throw err
    console.log("Ожидаю запросов!")
})

responder.on("message", data => {
    const request = JSON.parse(data)
    console.log(`Получили запрос на: ${request.path}`)
    fs.readFile(request.path, (err, content) => {
        console.log('Посылаем контент файла')
        const msg = JSON.stringify({
            content: content.toString(),
            timestamp: Date.now()
        })
        responder.send(msg)
    })
})