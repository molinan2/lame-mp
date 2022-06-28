const fs = require('fs');

/**
 * Gets all files in a directory, recursively
 *
 * @param {string} root
 * @returns {[string]}
 */
module.exports.getFilenames = function(root) {
    const fileNames = [];
    traverseDirectory(root);

    return fileNames;

    function traverseDirectory(dirName) {
        const entities = fs.readdirSync(dirName, { withFileTypes: true });
        const files = entities.filter(e => e.isFile());
        const directories = entities.filter(e => e.isDirectory());

        for (const f of files) {
            const fileName = `${dirName}/${f.name}`;
            fileNames.push(fileName);
        }

        for (const d of directories) {
            const subdirName = `${dirName}/${d.name}`;
            traverseDirectory(subdirName);
        }
    }
};
