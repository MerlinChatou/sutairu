# sutairu

On demand awesome CSS framework



## Usage Guide

The best way to use **Sutairu** is to generate your CSS directly from the Command Line Interface (CLI).

### Basic Command

```bash
sutairu [options]
```

### 🛠 Available Options

| Option       | Alias | Description                                      | Default                                           |
| :----------- | :---- | :----------------------------------------------- | :------------------------------------------------ |
| `--watch`    | `-w`  | Folders or glob patterns to monitor for changes  | `./src`                                           |
| `--output`   | `-o`  | The destination path for the generated CSS file  | `./dist/sutairu.css` and `./dist/sutairu.min.css` |
| `--ext`      | `-e`  | Comma-separated list of file extensions to scan  | `html,js,jsx,ts...`                               |
| `--themes`   | `-t`  | Themes to include in the build (comma-separated) | `default`                                         |
| `--safelist` | `-s`  | Classes to always include (comma-separated)      | `''`                                              |
| `--verbose`  | `-v`  | Show detailed logs and performance metrics       | `false`                                           |
| `--label`    | `-l`  | Custom prefix for the console logger             | `SUTAIRU`                                         |

### Examples

Here is a typical usage example:

```bash
sutairu -w "./src/,./playground/" -e "html" -o "./dist/main.css" -s "bg-red-500,d-flex" -v
```


#### Standard Development Mode

Watch your `src` folder and output to a local `assets` directory with verbose logging enabled:

```bash
sutairu -w "./src" -o "./assets/main.css" -v
```

#### Specific File Extensions

If you only want to scan HTML and PHP files while adding specific classes to the safelist:

```bash
sutairu -e "html,php"
```

#### Safe list

The Safelist is used to force Sutairu to include specific classes in the final CSS output, even if they aren't found during the file scan. This is essential for classes generated dynamically in JavaScript (e.g., class="bg-${color}-500").

```bash
sutairu -s "bg-red-500,flex,hidden,opacity-50"
```

#### Multiple Themes

Generate a CSS file that includes both the `default` and `dark` theme configurations:

```bash
sutairu -t "default,dark"
```


#### Verbose

Enable verbose logging to see real-time updates on which files are being indexed, the number of classes found, and the exact time (in milliseconds) it takes to generate your CSS.

```baseh
sutairu -v
```


