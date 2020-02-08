import {Command} from "discot";

export default <Command>{
    name: 'ping',
    description: 'Reply with "pong".',
    action: message => {
        message.channel.send('pong')
    }
}