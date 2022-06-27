const files = require('./lib/files');
const ffmpeg = require('./lib/ffmpeg');

(async function() {
    const filenames = files.getFiles('./files', 'flac');
    console.log(filenames);

    for (const f of filenames) {
        const destination = await ffmpeg.encodeMp3(f);
        console.log('Encoded:', destination);
    }
})();
