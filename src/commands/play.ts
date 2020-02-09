import {Command} from "discot";
import {YoutubeAudioStream} from "../tools/YoutubeAudioStream";

export default <Command>{
    name: 'play',
    description: 'Play a youtube video audio in your current audio channel.',
    requiredArgCount: 1,
    action(message, args) {
        const {voiceChannel} = message.member;

        if(voiceChannel){
            voiceChannel
                .join()
                .then(connection => {
                    connection
                        .playStream(new YoutubeAudioStream(args[0]))
                        .on('end', () => {
                            voiceChannel.leave();
                        })
                        .on('error', () => {
                            voiceChannel.leave();
                        })
                })
        }else{
            message.channel.send('I\'m sorry, but you need to be in an audio channel to execute this command.');
        }
    }
}