import fs from 'node:fs';
import path from 'node:path';

function getFilenames(root) {
    const filenames = [];
    traverseDirectory(root);

    return filenames;

    function traverseDirectory(directoryPath) {
        const entities = fs.readdirSync(directoryPath, { withFileTypes: true });

        for (const entity of entities) {
            const entityPath = path.join(directoryPath, entity.name);

            if (entity.isFile()) {
                filenames.push(entityPath);
                continue;
            }

            if (entity.isDirectory()) {
                traverseDirectory(entityPath);
            }
        }
    }
}

export default {
    getFilenames
};
