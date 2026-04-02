import path from 'node:path';
import chalk from 'chalk';

function colorizeFilename(filename) {
    const relativeFilename = path.relative(process.cwd(), filename);
    const displayFilename = relativeFilename || '.';
    const { dir, base } = path.parse(displayFilename);

    if (!dir) {
        return base;
    }

    return `${chalk.gray(dir)}${chalk.gray(path.sep)}${base}`;
}

export default {
    colorizeFilename
};
