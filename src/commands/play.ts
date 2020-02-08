import {Command} from "discot";
import {YoutubeAudioStream} from "../tools/YoutubeAudioStream";

export default <Command>{
    name: 'play',
    description: 'Play a youtube video audio in your current audio channel.',
    requiredArgCount: 1,
    action(message, args) {
        if (args.length === 0) return;

        const {voiceChannel} = message.member;

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
    }
}