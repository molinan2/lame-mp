const util = require('util');
const { exec } = require('child_process');

const ls = exec('ls -l', function (error, stdout, stderr) {
    if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
    }

    console.log('Child Process STDOUT: ' + stdout);
    console.log('Child Process STDERR: ' + stderr);
});

ls.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code);
});

const exec2 = util.promisify(require('child_process').exec);

async function lsExample() {
    try {
        const { stdout, stderr } = await exec2('ls');
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    } catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
}

lsExample();
