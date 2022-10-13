const EventEmitter = require("events").EventEmitter; 
 
class JMPClient extends EventEmitter { 
    constructor(stream) { 
        super(); 
        let buffer = ""; 
        stream.on("data", data => { 
            buffer += data 
            let ending = buffer.indexOf("\n"); 
            while(ending != -1) { 
                let input = buffer.substring(0, ending); 
                buffer = buffer.substring(ending + 1); 
                console.log(input); 
                this.emit("message", JSON.parse(input)); 
                ending = buffer.indexOf("\n"); 
            } 
        }) 
    } 
    static connect(stream) { 
        return new JMPClient(stream); 
    } 
} 
 
module.exports = JMPClient 
 
/**  
 * const net = require("net") 
 * const client = net.connect({port: 3870}) 
 * const JMPClient = new JMPClient(client) 
 * const JMPClient = JMPClient.connect(client) 
 * JMPC.on("data", data => { 
 * .... 
 * }) 
 */
