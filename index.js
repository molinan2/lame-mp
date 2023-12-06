const minimist = require('minimist');
const storage = require('./lib/storage');
const encoding = require('./lib/encoding');

(async function() {
    const folder = `${__dirname}/files`;
    const extensions = ['flac', 'wav', 'm4a', 'aac', 'opus', 'ogg', 'mkv', 'mp4', 'webm'];
    const quality = parseQuality();
    const filenames = storage
        .getFilenames(folder)
        .filter(f => isFileTypeAllowed(f,extensions));
    await encoding.batchEncodeMp3(filenames, quality);
})();

function isFileTypeAllowed(filename, extensions=null) {
    if (!extensions) return true;
    for (const e of extensions) {
        if (filename.endsWith(`.${e}`)) return true;
    }
    return false;
}

/**
 * Parses 'quality' from the command line, either '-q N' or '--quality N'
 *
 * @return {number}
 */
function parseQuality() {
    const args = minimist(process.argv);
    const q = args['q'] || args['quality'] || 0;

    return q;
}
