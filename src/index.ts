import {Bot} from 'discot';
import pingCommand from './commands/ping';
import mockCommand from './commands/mock';
import playCommand from './commands/play';

new Bot()
    .addCommand(pingCommand)
    .addCommand(mockCommand)
    .addCommand(playCommand)
    .start(() => console.log('Robert started'));
