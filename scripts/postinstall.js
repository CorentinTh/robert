const {symlinkSync} = require('fs');
const {join} = require('path');
const ffmpegPath = require('ffmpeg-static');

try {
    symlinkSync(ffmpegPath, join(__dirname, '..', 'ffmpeg'));
} catch (e) { }

console.log('Postinstall script executed successfully.');