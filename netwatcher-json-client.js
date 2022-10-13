const net = require('net'); 
const fs = require('fs'); 
const filename = process.argv[2]; 
 
if (!filename) throw Error('Укажите имя файла!!!'); 
 
net.createServer(cnn => { 
    console.log('Кто-то присоединился'); 
    const msg = JSON.stringify({type: "watching", file: "filename"})  
    cnn.write(msg + "\n") 
 
    fs.watchFile(filename, () => { 
        const msg = JSON.stringify({type: "changed", timestamp: Date.now()}) 
        cnn.write(msg + "\n"); 
    }) 
 
    cnn.on('close', () => { 
        console.log('Клиент отключился') 
        fs.unwatchFile(filename); 
 
    }) 
}).listen(3870, () => console.log('Сервер запущен'))