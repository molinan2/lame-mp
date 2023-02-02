# About

Encodes multiple audio files to Mp3 VBR at maximum quality (q=0 and maximum quality). Sends each file to a different thread, so all cores will be used if you encode enough files at the same time. This is a very simple implementation that does the trick to speed up the process.

# Requirements

Use Node 16 or higher.

Install `ffmpeg` as binary, for instance using `brew` (MacOS):

```shell
brew install ffmpeg
```

# Usage

Place your audio files inside the `files/` folder. All subfolders will be traversed recursively.

Run:

```shell
node index.js
```

Newly encoded Mp3 files will be stored next to their source files, within the same folder. Source files/folders will remain untouched.