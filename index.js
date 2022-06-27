const files = require('./lib/files');
const ffmpeg = require('./lib/ffmpeg');
const Bottleneck = require('bottleneck/es5');

(async function() {
    const filenames = files.getFiles('./files', 'flac');
    await batchEncode(filenames);
})();

async function batchEncode(filenames) {
    const limiter = new Bottleneck({
        maxConcurrent: 8,
        minTime: 0
    });

    for (const f of filenames) {
        limiter.schedule(() => ffmpeg.encodeMp3(f));
    }

    return new Promise((resolve, reject) => {
        limiter.on('idle', function() {
            console.log('Done');
            resolve();
        });
    })
}
