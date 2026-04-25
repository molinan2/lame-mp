#!/usr/bin/env node

/**
 * Encodes supported audio/video files from one or more input paths to MP3
 * next to the source files. Input paths can point to either files or
 * directories, and directories are traversed recursively.
 *
 * Usage:
 *   node index.js [--quality <0-9>] [path ...]
 *
 * Options:
 *   -q, --quality <0-9>  LAME VBR quality, from 0 (highest) to 9 (lowest).
 *
 * Inputs:
 *   [path ...]           One or more files and/or directories to encode.
 *                        Defaults to the current directory when omitted.
 *
 * Examples:
 *   node index.js
 *   node index.js "./album"
 *   node index.js "./song.flac"
 *   node index.js -q 2 "./album" "./song.flac" "./more-files"
 */

import minimist from 'minimist';
import fs from 'node:fs';
import path from 'node:path';
import storage from './lib/storage.js';
import encoding from './lib/encoding.js';

const DEFAULT_QUALITY = 0;
const SOURCE_EXTENSIONS = new Set(['.flac', '.wav', '.m4a', '.aac', '.opus', '.ogg', '.mkv', '.mp4', '.webm']);

async function main() {
    const options = parseOptions();
    const inputPaths = options.paths;
    const quality = options.quality;
    const filenames = collectFilenames(inputPaths)
        .filter(isFileTypeAllowed)
        .sort((a, b) => a.localeCompare(b));

    await encoding.batchEncodeMp3(filenames, quality);
}

function isFileTypeAllowed(filename) {
    return SOURCE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function parseOptions() {
    const args = minimist(process.argv.slice(2));
    const rawQuality = args.q ?? args.quality ?? DEFAULT_QUALITY;
    const rawPaths = args._.length > 0 ? args._ : ['.'];
    const quality = Number.parseInt(rawQuality, 10);

    if (!Number.isInteger(quality) || quality < 0 || quality > 9) {
        throw new Error(`Invalid quality "${rawQuality}". Expected an integer from 0 to 9.`);
    }

    return {
        paths: rawPaths.map((inputPath) => path.resolve(process.cwd(), inputPath)),
        quality
    };
}

function collectFilenames(inputPaths) {
    const filenames = new Set();

    for (const inputPath of inputPaths) {
        const stats = fs.statSync(inputPath);

        if (stats.isFile()) {
            filenames.add(inputPath);
            continue;
        }

        if (stats.isDirectory()) {
            for (const filename of storage.getFilenames(inputPath)) {
                filenames.add(filename);
            }
        }
    }

    return [...filenames];
}

await main();
