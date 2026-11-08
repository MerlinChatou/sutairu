# Sutairu Icons

## Add a new icon

### Prerequisites

Run `npm install` once at the root of the repo.

### 1. Draw the icon

Start from [icon-template.svg](./icon-template.svg). It contains layers with basic shapes (triangles, circles, squares, etc.) that you can use as guides for your composition.

Draw your icon in the layer named `icon`. Only this layer is processed; all other layers and `<defs>` are ignored.

Rules:
- Use a **square viewBox** (the template's). The icon keeps its position inside the viewBox, so draw it centered in the template.
- Convert strokes to outlines first (Path → Stroke to Path).
- `<text>`, `<image>` and gradients are not supported. Convert text to paths.

### 2. Save the raw file

Save it as `/src/icons/raw/<category>/<icon-name>.svg`.

- Both the category and the name must be **kebab-case**.
- The file name determines the Sutairu class name: `my-icon.svg` becomes `.i-my-icon`.
- Use the `-solid`, `-thin` or `-wide` suffix for style variants (`my-icon-solid.svg`). Any other name is considered `regular`.


### 3. Run the command

From the root of the repo:

```bash
sutairu-add-icon ./src/icons/raw/<category>/<icon-name>.svg
```

If the command is not found, either:
- prefix it with `npx`: `npx sutairu-add-icon ...`
- or register the binaries once with `npm link`, then run the command directly



This command will:
- keep only the `icon` layer
- scale the viewBox to 24×24 (the position of the icon inside the viewBox is preserved)
- merge all shapes into a single path
- optimize the path to reduce its size (2 decimals)
- save the optimized SVG in `/src/icons/svg/<category>/<icon-name>.svg`
- add the path to the matching JS file (`/src/rules/icons/data/<category>.js`), keeping the alphabetical order
- add the icon to `/src/rules/icons/meta/icons-meta.json`

If the icon already exists, its path is replaced and its existing `tags` and `related` are kept. Nothing is written if an error occurs.

### 4. Fill in the metadata

The metadata is required by the [Sutairu website search engine](https://sutairu.com/icons).

1. Open [/src/rules/icons/meta/icons-meta.json](/src/rules/icons/meta/icons-meta.json).
2. Find the new icon in the list.
3. Populate the empty fields:
   - `"tags": []` with the main keywords
   - `"related": []` with related keywords

**Tip:** adapt the following prompt and ask your favorite AI bot, with the SVG file attached:

```
Here is an icon: <describe the icon in one or two sentences>.

Generate search metadata for it:
- "tags": 4 to 6 lowercase keywords that directly describe the icon (what it shows, its main use)
- "related": 4 to 6 lowercase keywords for neighboring concepts a user might search for instead

Use single words when possible, no duplicates, no punctuation.
Return only valid JSON, with this structure:

{
  "name": "<icon-name>",
  "category": "<category>",
  "style": "<regular|solid|thin|wide>",
  "tags": [],
  "related": []
}
```

Please review the tags manually before updating [/src/rules/icons/meta/icons-meta.json](/src/rules/icons/meta/icons-meta.json).

### Review checklist

- [ ] The icon renders correctly in `/src/icons/svg/<category>/<icon-name>.svg` (holes and overlaps are as expected)
- [ ] The icon is well placed within the 24×24 grid
- [ ] `tags` and `related` are filled in `icons-meta.json`
- [ ] Both `raw/` and `svg/` files are committed, along with the updated `data/<category>.js` and `icons-meta.json`