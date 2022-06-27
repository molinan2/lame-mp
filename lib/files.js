const fs = require('fs');

/**
 * Gets all files in a directory, recursively
 *
 * @param {string} root
 * @param {string|null} type
 * @returns {[string]}
 */
module.exports.getFiles = function(root, type= null) {
    const fileNames = [];
    traverseDirectory(root);

    return fileNames;

    function traverseDirectory(dirName) {
        const entities = fs.readdirSync(dirName, { withFileTypes: true });
        const files = entities.filter(e => e.isFile());
        const directories = entities.filter(e => e.isDirectory());

        for (const f of files) {
            const fileName = `${dirName}/${f.name}`;
            const allowed = !type || (type && fileName.endsWith(type));
            if (allowed) {
                fileNames.push(fileName);
            }
        }

        for (const d of directories) {
            const subdirName = `${dirName}/${d.name}`;
            traverseDirectory(subdirName);
        }
    }
};

