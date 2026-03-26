import { logger } from "./utils/logger.js";
import { getStaticStyles } from "./utils/css-loader.js";
import { hoistImports } from "./utils/css-hoist.js";
import { classRegex, getClassNameFromMatch } from "./patterns.js";
import fs from "fs-extra";
import { transform } from "lightningcss";
import { compileCSS } from "./compiler.js";

const fileClassMap = new Map();

export function scanFile(filePath) {
  // If verbose is required display parsed file
  logger.verbose(`[NEW] Monitoring: ${filePath}`);

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

export async function generateCSS(config, safeList) {
  logger.verbose("Start generating CSS");

  // 1. Get all unique classes
  const allUniqueClasses = new Set();
  for (const classes of fileClassMap.values()) {
    classes.forEach((cls) => allUniqueClasses.add(cls));
  }
  // Add safelist
  safeList.forEach((cls) => allUniqueClasses.add(cls));
  logger.info(`${allUniqueClasses.size} classes found`);

  // 2. Build css from class list
  const onDemandCSS = compileCSS(Array.from(allUniqueClasses));

  // 3. Load static CSS (reset.css and required themes) and prepare final CSS
  const staticCss = await getStaticStyles([
    "base/reset.css",
    "base/base.css",
    ...config.themes.map((t) => `themes/${t}/core.css`),
    ...config.themes.map((t) => `themes/${t}/button.css`),
    ...config.themes.map((t) => `themes/${t}/modal.css`),
  ]);
  let finalCSS = `${staticCss}\n\n${onDemandCSS}`;

  // 4. Move all @import at the very top of the CSS
  finalCSS = hoistImports(finalCSS);

  // 5. Minify
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
