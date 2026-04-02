#!/usr/bin/env node

import minimist from 'minimist';
import path from 'node:path';
import storage from './lib/storage.js';
import encoding from './lib/encoding.js';

const DEFAULT_QUALITY = 0;
const SOURCE_EXTENSIONS = new Set(['.flac', '.wav', '.m4a', '.aac', '.opus', '.ogg', '.mkv', '.mp4', '.webm']);

async function main() {
    const options = parseOptions();
    const folder = options.path;
    const quality = options.quality;
    const filenames = storage
        .getFilenames(folder)
        .filter(isFileTypeAllowed);

    await encoding.batchEncodeMp3(filenames, quality, folder);
}

function isFileTypeAllowed(filename) {
    return SOURCE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function parseOptions() {
    const args = minimist(process.argv.slice(2));
    const rawPath = args.p ?? args.path ?? '.';
    const rawQuality = args.q ?? args.quality ?? DEFAULT_QUALITY;
    const targetPath = path.resolve(process.cwd(), rawPath);
    const quality = Number.parseInt(rawQuality, 10);

    if (!Number.isInteger(quality) || quality < 0 || quality > 9) {
        throw new Error(`Invalid quality "${rawQuality}". Expected an integer from 0 to 9.`);
    }

    return {
        path: targetPath,
        quality
    };
}

await main();
