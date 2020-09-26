import {Command} from "discot";
import axios from "axios";

const URL = 'http://api.chucknorris.io/jokes/random';
const CODE_FORMAT = "```";

export default <Command>{
    name: 'cnfact',
    description: 'Gives a random Chuck Noris fact.',
    action: async message => {
      try {
        const {data} = await axios.get(URL);
        message.channel.send(`${CODE_FORMAT}${data.value}${CODE_FORMAT}`);
      } catch (error) {
          message.channel.send('Cannot retrieve a Chuck Norris fact.')
      }
    }
}