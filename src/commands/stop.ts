import {Command} from "discot";
import {YoutubeAudioStream} from "../tools/YoutubeAudioStream";

export default <Command>{
    name: 'stop',
    description: 'Stop bot from playing sounds in audio channels.',
    action(message) {
        const {client} = message;

        client.voiceConnections.forEach(connection => connection.channel.leave());
    }
}