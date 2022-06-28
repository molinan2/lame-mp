const storage = require('./lib/storage');
const encoding = require('./lib/encoding');

(async function() {
    const folder = './files';
    const extensions = ['flac', 'wav', 'm4a', 'aac'];
    const filenames = storage
        .getFilenames(folder)
        .filter(f => isFilenameAllowed(f,extensions));
    await encoding.batchEncodeMp3(filenames);
})();

function isFilenameAllowed(filename, extensions=null) {
    if (!extensions) return true;
    for (const e of extensions) {
        if (filename.endsWith(`.${e}`)) return true;
    }
    return false;
}
