# About

Encodes multiple audio files to Mp3 VBR at maximum quality (q=0 and maximum quality). Sends each file to a different thread, so all cores will be used if you encode enough files at the same time. This is a very simple implementation that does the trick to speed up the process.

# Requirements

Use Node 24 or higher.

Install `ffmpeg` as binary, for instance using `brew` (macOS):

```shell
brew install ffmpeg
```

# Usage

Place your audio files inside the `files/` folder. Then run:

```shell
node index.js
```

All subfolders will be traversed recursively. Newly created Mp3 files will be stored next to their source files, within the same folder. Source files/folders will remain untouched.

### Quality

Specify the quality of the encoding with the option `--quality` (or `-q`) as a number ranging from `0` (highest) to `9` (lowest). Default quality is `0` (maximum):

```shell
node index.js -q 2
node index.js --quality 2
```

### Path

Specify the input path with the option `--path` (or `-p`). If none is provided, the current working directory will be assumed:

```shell
node index.js --path "./my-folder"
node index.js -p "./my-folder"
```

# Notes

Command line for maximum VBR quality using `ffmpeg`:

```sh
ffmpeg -y -v error -i INPUT.wav -c:v copy -c:a libmp3lame -q:a 0 compression_level 0 OUTPUT.mp3
```

Note that `ffmpeg` maps LAME's `-V0` option (quality) to `-q:a 0` and LAME's `-q 0` option (noise shaping & psycho acoustic algorithms) to `-compression_level 0`, as documented [here](https://ffmpeg.org/ffmpeg-codecs.html#libmp3lame-1).
