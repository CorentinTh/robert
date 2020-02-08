import {Command} from "discot";

const mock = (s: string): string => s.split('').reduce((a: string, l: string, i: number) => a += (i % 2) ? l.toUpperCase() : l.toLowerCase(), '');

export default <Command>{
    name: 'mock',
    description: 'Mock previous tweet like Spongebob.',
    action: message => {
        message.channel.fetchMessages({ limit: 2 }).then(messages => {
            if (messages.size === 2){
                message.channel.send(mock(messages.last().content));
            }else{
                message.channel.send('No message to mock.');
            }
        });
    }
}