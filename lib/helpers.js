import path from 'node:path';
import chalk from 'chalk';

function colorizeFilename(filename, basePath = process.cwd()) {
    const displayFilename = toDisplayPath(filename, basePath);
    const { dir, base } = path.parse(displayFilename);

    if (!dir) {
        return base;
    }

    return `${chalk.gray(dir)}${chalk.gray(path.sep)}${base}`;
}

function toDisplayPath(filename, basePath) {
    const relativeFilename = path.relative(basePath, filename) || path.basename(filename);
    const relativeDirectory = path.dirname(relativeFilename);
    const displayDirectory = relativeDirectory === '.'
        ? '.'
        : `.${path.sep}${relativeDirectory}`;

    return path.format({
        dir: displayDirectory,
        base: path.basename(relativeFilename)
    });
}

export default {
    colorizeFilename
};
