const util = require("util");
const exec = util.promisify(require('child_process').exec);

module.exports.encodeMp3 = async function (filename) {
    const destination = `${filename.replace(/\.\w+$/ig, '')}.mp3`;
    const command = `ffmpeg -y -v error -i ${filename} -c:a libmp3lame -q:a 0 ${destination}`;
    const { stdout, stderr } = await exec(command);

    return destination;
};
