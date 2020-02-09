import FFmpeg, {FfmpegCommand} from 'fluent-ffmpeg'
import ytdl from 'ytdl-core'
import {PassThrough, Readable} from 'stream'

export class YoutubeAudioStream extends PassThrough {
    private readonly video: Readable;
    private ffmpeg: FfmpegCommand;

    constructor(url: string) {
        super();

        this.video = ytdl(url, {
            quality: 'lowestaudio',
            filter: 'audioonly'
        });

        this.ffmpeg = FFmpeg(this.video);

        process.nextTick(() => {
            this.ffmpeg.format('mp3').pipe(this);

            this.ffmpeg.on('error', (error: Error) => this.emit('error', error));
            this.on('error', (error: Error) => {
                this.video.destroy();
                console.log(error);
            })
        })
    }
}

