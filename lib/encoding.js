const os = require('os');
const util = require('util');
const childProcess = require('child_process');
const Bottleneck = require('bottleneck/es5');

const exec = util.promisify(childProcess.exec);

module.exports.encodeMp3 = async function (filename) {
    const destination = `${filename.replace(/\.\w+$/ig, '')}.mp3`;
    console.log(destination);
    const command = `ffmpeg -y -v error -i "${filename}" -c:a libmp3lame -q:a 0 -compression_level 0 "${destination}"`;
    const { stdout, stderr } = await exec(command);

    return destination;
};

/**
 * Batch encodes a list of files
 *
 * @param {Array.<string>} filenames
 * @returns {Promise}
 */
module.exports.batchEncodeMp3 = async function(filenames) {
    const cpus = os.cpus();
    const limiter = new Bottleneck({
        maxConcurrent: cpus.length,
        minTime: 0
    });

    for (const f of filenames) {
        limiter.schedule(() => this.encodeMp3(f));
    }

    return new Promise((resolve, reject) => {
        limiter.on('idle', () => resolve());
    })
};