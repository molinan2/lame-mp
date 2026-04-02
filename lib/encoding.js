import os from 'node:os';
import path from 'node:path';
import childProcess from 'node:child_process';
import { promisify } from 'node:util';
import pLimit from 'p-limit';
import helpers from './helpers.js';

const execFile = promisify(childProcess.execFile);

async function encodeMp3(filename, quality = 0, basePath = process.cwd()) {
    const extension = path.extname(filename);
    const destination = path.format({
        ...path.parse(filename),
        base: undefined,
        ext: '.mp3',
        name: path.basename(filename, extension)
    });

    console.log(helpers.colorizeFilename(destination, basePath));

    await execFile(
        'ffmpeg',
        [
            '-y',
            '-v',
            'error',
            '-i',
            filename,
            '-c:v',
            'copy',
            '-c:a',
            'libmp3lame',
            '-q:a',
            String(quality),
            '-compression_level',
            '0',
            destination
        ],
        { encoding: 'utf-8' }
    );

    return destination;
}

async function batchEncodeMp3(filenames, quality = 0, basePath = process.cwd()) {
    const limit = pLimit(os.availableParallelism());
    const jobs = filenames.map((filename) => limit(() => encodeMp3(filename, quality, basePath)));
    await Promise.all(jobs);
}

export default {
    encodeMp3,
    batchEncodeMp3
};
