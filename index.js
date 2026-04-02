#!/usr/bin/env node

import minimist from 'minimist';
import path from 'node:path';
import storage from './lib/storage.js';
import encoding from './lib/encoding.js';

const DEFAULT_QUALITY = 0;
const SOURCE_EXTENSIONS = new Set(['.flac', '.wav', '.m4a', '.aac', '.opus', '.ogg', '.mkv', '.mp4', '.webm']);

async function main() {
    const folder = process.cwd();
    const quality = parseQuality();
    const filenames = storage
        .getFilenames(folder)
        .filter(isFileTypeAllowed);

    await encoding.batchEncodeMp3(filenames, quality);
}

function isFileTypeAllowed(filename) {
    return SOURCE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function parseQuality() {
    const args = minimist(process.argv.slice(2));
    const rawQuality = args.q ?? args.quality ?? DEFAULT_QUALITY;
    const quality = Number.parseInt(rawQuality, 10);

    if (!Number.isInteger(quality) || quality < 0 || quality > 9) {
        throw new Error(`Invalid quality "${rawQuality}". Expected an integer from 0 to 9.`);
    }

    return quality;
}

await main();
