const netClient = require("net").connect({port: 3870}); 
const JMPClient = require("./lib/jmp-client.js").connect(netClient); 
 
JMPClient.on("message", message => { 
    switch(message.type.toLowerCase()) { 
        case "watching": 
            console.log(`Наблюдаем за файлом ${message.file}`); 
            break; 
        case "changed": 
            console.log(`Файл изменен: ${new Date(message.timestamp)}`); 
            break; 
        default:  
            console.log(`Неизвестная операция: ${message.type}`); 
    } 
})