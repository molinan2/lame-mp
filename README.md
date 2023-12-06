# About

Encodes multiple audio files to Mp3 VBR at maximum quality (q=0 and maximum quality). Sends each file to a different thread, so all cores will be used if you encode enough files at the same time. This is a very simple implementation that does the trick to speed up the process.

# Requirements

Use Node 16 or higher.

Install `ffmpeg` as binary, for instance using `brew` (macOS):

```shell
brew install ffmpeg
```

# Usage

Place your audio files inside the `files/` folder. Then run:

```shell
node index.js
```

All subfolders will be traversed recursively. Newly created Mp3 files will be stored next to their source files, within the same folder. Source files/folders will remain untouched. Mp3 files won't be re-encoded.

### Quality

Specify the quality of the encoding as a number ranging from `0` (highest) to `9` (lowest):

```shell
node index.js -q 2
node index.js --quality 2
```

Default quality is `0` (maximum).
