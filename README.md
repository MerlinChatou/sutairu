# Sutairu

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, high-performance utility CSS framework designed to scan your project files and generate optimized, atomic styles in real time. It also includes hundreds of embedded icons that are compiled on demand directly into your CSS.

## Installation

Install Sutairu as a development dependency:

```bash
npm install -D @merlin-chatou/sutairu
```

Once installed, Sutairu exposes two binaries via your project's scripts or `npx`:

* `sutairu` — The core CSS compiler CLI.
* `sutairu-play` — The interactive local playground launcher.


## Configuration File

Sutairu automatically looks for a `sutairu.config.js` file in your root directory. You can define your default build options right in your project:

```javascript
// sutairu.config.js

export default {
  watch: "./src, ./static",
  themes: "sutairu,swiss",
  output: "./generated/sutairu.css",
  themesJson: "./generated/sutairu-themes.json", 
  ext: "html,svelte",
  verbose: false,
  label: 'SUTAIRU',
  safelist: ['bg-red-500', 'flex', 'hidden'],
};
```

The `sutairu.config.js` file is loaded once when the compiler starts up. If you modify your configuration options while running in watch mode, you will need to restart Sutairu for the changes to take effect.

## CLI Usage & Options

You can invoke the CLI directly using `npx`:

```bash
npx sutairu [options]
```

Any options passed via the command line will automatically override your `sutairu.config.js` settings.

### Available Options


| Option | Alias | Description | Default |
| --- | --- | --- | --- |
| `--watch` | `-w` | Folders or glob patterns to monitor for changes | `./src` |
| `--output` | `-o` | Destination path for the generated CSS file | `./dist/sutairu.css` & `./dist/sutairu.min.css` |
| `--theme-json` | `-j` | Destination path for the generated themes JSON file | `''` |
| `--ext` | `-e` | Comma-separated list of file extensions to scan | `html,js,jsx,ts,tsx...` |
| `--themes` | `-t` | Comma-separated list of themes to include in the build | `default` |
| `--safelist` | `-s` | Comma-separated list of classes to always include | `''` |
| `--verbose` | `-v` | Show detailed logs and build performance metrics | `false` |
| `--label` | `-l` | Custom prefix for the console logger | `SUTAIRU` |

### Examples

#### Using the Configuration File

If you have a `sutairu.config.js` set up, simply run:

```bash
npx sutairu
```

#### Override with CLI Flags

Watch specific directories and output to a custom path on the fly:

```bash
npx sutairu -w "./src" -o "./assets/main.css" -v
```

#### Safelist Dynamic Classes

Force Sutairu to include specific classes in the final CSS output even if they aren't statically detected during file scanning—ideal for dynamically constructed classes (e.g., `bg-${color}-500`):

```bash
npx sutairu -s "bg-red-500,flex,hidden,opacity-50"
```

#### Multiple Themes

Generate a CSS bundle combining specific themes:

```bash
npx sutairu -t "sutairu,swiss,adjuvio"
```


## Playground Launcher

Launch the interactive local playground to experiment with Sutairu classes and preview components in real time:

```bash
npx sutairu-play
```

## Contributing & Icons

To add new icons to the library, follow [these instructions](https://github.com/MerlinChatou/sutairu/blob/main/src/icons/README.md).



