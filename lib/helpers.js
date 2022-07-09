const chalk = require('chalk');

module.exports.colorizeFilename = function(filename) {
    const blocks = filename.split('/');
    let colored = '';

    for (let i=0; i<blocks.length; i++) {
        if (i !== blocks.length - 1) {
            const sub = blocks[i];
            colored += chalk.gray(sub) + chalk.gray('/');
        }
    }

    colored += blocks[blocks.length-1];
    return colored;
}
