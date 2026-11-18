[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Sutairu

Lightweight, high-performance utility CSS framework designed to scan your project files and generate optimized, atomic styles in real-time.

## Installation

Install Sutairu as a development dependency:

```bash
npm install -D @merlin-chatou/sutairu
```

## Usage Guide

Generate your CSS directly from the Command Line Interface (CLI):

```bash
npx sutairu [options]
```

### Available Options

| Option | Alias | Description | Default |
| --- | --- | --- | --- |
| `--watch` | `-w` | Folders or glob patterns to monitor for changes | `./src` |
| `--output` | `-o` | Destination path for the generated CSS file | `./dist/sutairu.css` & `./dist/sutairu.min.css` |
| `--ext` | `-e` | Comma-separated list of file extensions to scan | `html,js,jsx,ts,tsx...` |
| `--themes` | `-t` | Comma-separated list of themes to include in the build | `default` |
| `--safelist` | `-s` | Comma-separated list of classes to always include | `''` |
| `--verbose` | `-v` | Show detailed logs and build performance metrics | `false` |
| `--label` | `-l` | Custom prefix for the console logger | `SUTAIRU` |

### Examples

Combine multiple options for a complete build setup:

```bash
npx sutairu -w "./src/,./playground/" -e "html" -o "./dist/main.css" -s "bg-red-500,d-flex" -v
```

#### Standard Development Mode

Watch your `src` folder and output to a local `assets` directory with verbose logging enabled:

```bash
npx sutairu -w "./src" -o "./assets/main.css" -v
```

#### Specific File Extensions

Scan only HTML and PHP files:

```bash
npx sutairu -e "html,php"
```

#### Safelist

Force Sutairu to include specific classes in the final CSS output even if they aren't statically detected during file scanning—useful for dynamically constructed classes (e.g., ``bg-${color}-500``):

```bash
npx sutairu -s "bg-red-500,flex,hidden,opacity-50"

```

#### Multiple Themes

Generate a CSS bundle that includes both the `default` and `dark` themes:

```bash
npx sutairu -t "default,dark"

```

#### Verbose Logging

Display real-time updates on indexed files, detected classes, and exact CSS generation time (in milliseconds):

```bash
npx sutairu -v

```

## Playground Launcher

Launch the interactive local playground to experiment with Sutairu classes and preview components in real time:

```bash
npx sutairu-play
```

## Contributing & Icons

To add new icons to the library, follow [these instructions](https://www.google.com/search?q=/src/icons/README.md).



