import path from 'node:path';
import chalk from 'chalk';

function colorizeFilename(filename) {
    const { dir, base } = path.parse(filename);

    if (!dir) {
        return base;
    }

    return `${chalk.gray(dir)}${chalk.gray(path.sep)}${base}`;
}

export default {
    colorizeFilename
};
