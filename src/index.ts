import {Bot} from 'discot';
import pingCommand from './commands/ping';
import mockCommand from './commands/mock';
import playCommand from './commands/play';
import stopCommand from './commands/stop';

new Bot()
    .addCommand(pingCommand)
    .addCommand(mockCommand)
    .addCommand(playCommand)
    .addCommand(stopCommand)
    .start(() => console.log('Robert started'));
