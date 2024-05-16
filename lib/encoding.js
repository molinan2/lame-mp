const os = require('os');
const childProcess = require('child_process');
const Bottleneck = require('bottleneck/es5');
const helpers = require('./helpers.js');

function execFile(command, args, options) {
    return new Promise((resolve, reject) => {
        childProcess.execFile(command, args, options, (err, data) => {
            if (err) return reject(err);
            else return resolve(data);
        });
    });
}

/**
 *
 * @param {string} filename Filename including relative path
 * @param {int} q LAME VBR quality [0-9]
 * @returns {Promise<string>}
 */
module.exports.encodeMp3 = async function (filename, q=0) {
    const destination = `${filename.replace(/\.\w+$/ig, '')}.mp3`;
    console.log(helpers.colorizeFilename(destination));
    const command = 'ffmpeg';
    const args = ['-y', '-v', 'error', '-i', filename, '-c:v', 'copy', '-c:a', 'libmp3lame', '-q:a', q, '-compression_level', '0', destination];
    const options = { encoding: 'utf-8' };
    const { stdout, stderr } = await execFile(command, args, options);

    return destination;
};

/**
 * Batch encodes a list of files
 *
 * @param {Array.<string>} filenames Array of filenames including relative path
 * @param {int} q LAME VBR quality [0-9]
 * @returns {Promise}
 */
module.exports.batchEncodeMp3 = async function(filenames, q=0) {
    const cpus = os.cpus();
    const limiter = new Bottleneck({
        maxConcurrent: cpus.length,
        minTime: 0
    });

    for (const f of filenames) {
        limiter.schedule(() => this.encodeMp3(f, q));
    }

    return new Promise((resolve, reject) => {
        limiter.on('idle', () => resolve());
    })
};
