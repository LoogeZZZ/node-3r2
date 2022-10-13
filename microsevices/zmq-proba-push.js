const zmq = require('zeromq');
const pusher = zmq.socket('push');

let counter = 0
setInterval(() => {
    const message = 'Hello ' + ++counter
    console.log(`Послали "${message}"`);
    pusher.send(message)
}, 2000)
//создание сообщение и таймер отправки


pusher.bind('tcp://127.0.0.1:3000', err => {
    if(err) throw err
    console.log("Работаю!");
})
//запуск
