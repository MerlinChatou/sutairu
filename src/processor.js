import { logger } from "./utils/logger.js";
import { getStaticStyles } from "./utils/css-loader.js";
import { hoistImports } from "./utils/css-hoist.js";
import { classRegex, getClassNameFromMatch } from "./patterns.js";
import fs from "fs-extra";
import { transform } from "lightningcss";
import { compileCSS } from "./compiler.js";

export const fileClassMap = new Map();

export function resetFileClassMap() {
  fileClassMap.clear();
}

export function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const classes = new Set();

    let match;
    // Reset regex index for safety if using 'g' flag across multiple files
    classRegex.lastIndex = 0;

    // Exec Regex
    while ((match = classRegex.exec(content)) !== null) {
      const rawValue = getClassNameFromMatch(match);

      if (rawValue) {
        // Split ONLY by whitespace (\s+)
        // This keeps "dark:fg-400" as one single string
        const individualClasses = rawValue.split(/\s+/);

        individualClasses.forEach((cls) => {
          const cleanCls = cls.trim();
          // Ignore single chars like ":" or " "
          if (cleanCls && cleanCls.length > 1) {
            classes.add(cleanCls);
            logger.verbose(`Captured class: ${cleanCls}`);
          }
        });
      }
    }

    fileClassMap.set(filePath, classes);
  } catch (err) {
    console.error(`Error: ${filePath}`, err.message);
  }
}


/**
 * Generates, compiles, and minifies the final CSS output based on scanned classes, 
 * conditional component/loader dependencies, and configuration.
 * 
 * @param {Object} config - The configuration object (includes themes and output paths).
 * @param {string[]} safeList - An array of classes to force-include.
 * @returns {Promise<Object>} Statistics object containing bundle metrics (classes count, file count, and sizes).
 */
export async function generateCSS(config, safeList) {
  logger.verbose("Start generating CSS");

  // 1. Get all unique classes
  const allUniqueClasses = new Set();
  for (const classes of fileClassMap.values()) {
    classes.forEach((cls) => allUniqueClasses.add(cls));
  }
  // Add safelist
  safeList.forEach((cls) => allUniqueClasses.add(cls));
  logger.verbose(`${allUniqueClasses.size} classes found`);

  // 2. Build css from class list
  const onDemandCSS = compileCSS(Array.from(allUniqueClasses));


  // 3. Load static CSS (reset.css, themes, etc.)
  const staticFiles = [
    "base/reset.css",
    "base/base.css",
    ...config.themes.map((t) => `themes/${t}/core.css`),
    ...config.themes.map((t) => `themes/${t}/button.css`),
    ...config.themes.map((t) => `themes/${t}/input.css`),
    ...config.themes.map((t) => `themes/${t}/modal.css`),
    ...config.themes.map((t) => `themes/${t}/card.css`),
    ...config.themes.map((t) => `themes/${t}/code.css`),
    ...config.themes.map((t) => `themes/${t}/typography.css`),
  ];
  
  
  //  Loader Animation Dependencies:
  //  • .loader            → su-loader-rotation
  //  • .loader-clip       → su-loader-rotation, su-loader-clip
  //  • .loader-skeleton   → su-loader-skeleton
  //  • .loader-grow       → su-loader-grow
  //  • .loader-dots-fade  → su-loader-dots-fade
  //  • .loader-dots-spin  → su-loader-dots-spin
  //  • .loader-comet      → su-loader-comet, su-loader-rotation

  const loaderFilesToLoad = new Set();

  // 4. Check for loader classes and add required loader files
  for (const cls of allUniqueClasses) {
    // Check using .includes() to support variants like "dark:loader-skeleton"
    if (cls === "loader" || cls.endsWith(":loader")) {
      loaderFilesToLoad.add("base/loaders/rotation.css");
    }
    if (cls.includes("loader-clip")) {
      loaderFilesToLoad.add("base/loaders/rotation.css");
      loaderFilesToLoad.add("base/loaders/clip.css");
    }
    if (cls.includes("loader-skeleton")) {
      loaderFilesToLoad.add("base/loaders/skeleton.css");
    }
    if (cls.includes("loader-grow")) {
      loaderFilesToLoad.add("base/loaders/grow.css");
    }
    if (cls.includes("loader-dots-fade")) {
      loaderFilesToLoad.add("base/loaders/dots-fade.css");
    }
    if (cls.includes("loader-dots-spin")) {
      loaderFilesToLoad.add("base/loaders/dots-spin.css");
    }
    if (cls.includes("loader-comet")) {
      loaderFilesToLoad.add("base/loaders/comet.css");
      loaderFilesToLoad.add("base/loaders/rotation.css");
    }
  }
  
  // 5. Append only the required loader files
  if (loaderFilesToLoad.size > 0) {
    logger.verbose(`Including ${loaderFilesToLoad.size} loader animation file(s).`);
    staticFiles.push(...Array.from(loaderFilesToLoad));
  }

  // 6. Load static CSS (reset.css and required themes) and prepare final CSS
  const staticCss = await getStaticStyles(staticFiles);
  let finalCSS = `${staticCss}\n\n${onDemandCSS}`;

  // 7. Move all @import at the very top of the CSS
  finalCSS = hoistImports(finalCSS);

  // 8. Minify
  const { code } = transform({
    code: Buffer.from(finalCSS),
    minify: true,
  });

  const minified = code.toString();

  // Save to files .css and .min.css
  const outputPath = config.output;
  const minOutputPath = outputPath.replace(/\.css$/, ".min.css");
  await fs.outputFileSync(outputPath, `${finalCSS}`);
  await fs.writeFileSync(minOutputPath, minified);

  // Log results and stats
  logger.info(`Minified CSS generated at ${minOutputPath}`);
  const stats = {
    classes: allUniqueClasses.size,
    files: fileClassMap.size,
    cssSize: fs.statSync(outputPath).size,
    minCssSize: fs.statSync(minOutputPath).size,
    cssSize: fs.statSync(outputPath).size,
  };
  return stats;
}

export const getFileCount = () => fileClassMap.size;
