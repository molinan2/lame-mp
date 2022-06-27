const files = require('./lib/files');

const filenames = files.getFiles('./files', 'flac');
console.log(filenames);