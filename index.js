const storage = require('./lib/storage');
const encoding = require('./lib/encoding');

(async function() {
    const filenames = storage.getFiles('./files', 'flac');
    await encoding.batchEncodeMp3(filenames);
})();
