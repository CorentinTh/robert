import {Bot} from 'discot';
import pingCommand from './commands/ping';
import mockCommand from './commands/mock';
import playCommand from './commands/play';
import stopCommand from './commands/stop';
import weatherCommand from './commands/weather';


new Bot()
    .addCommand(pingCommand)
    .addCommand(mockCommand)
    .addCommand(playCommand)
    .addCommand(stopCommand)
    .addCommand(weatherCommand)
    .start(() => console.log('Robert started'));
