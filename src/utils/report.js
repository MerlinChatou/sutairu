import byteSize from "byte-size";
import { logger } from "./logger.js";


export function report(stats) {
  const { value: valueCssSize, unit: unitCssSize } = byteSize(stats.cssSize);
  const { value: valueMinCssSize, unit: unitMinCssSize } = byteSize(stats.minCssSize);
  const report = `
┌──────────────────────────────────────────────────┐
│             SUTAIRU BUILD SUMMARY                │
├──────────────────────┬───────────────────────────┤
│ Classes Detected     │ ${stats.classes.toString().padEnd(25)} │
│ Files Monitored      │ ${stats.files.toString().padEnd(25)} │
├──────────────────────┼───────────────────────────┤
│ output.css           │ ${(stats.cssSize.toString() + " Bytes").padEnd(25)} │
│ output.min.css       │ ${(stats.minCssSize.toString() + " Bytes").padEnd(25)} │
└──────────────────────┴───────────────────────────┘
`;

  logger.verbose(report);
  logger.info(`Processed ${stats.classes} classes in ${stats.files} files in ${stats.duration} ms.`);
  logger.info(`Raw CSS = ${valueCssSize}${unitCssSize} - Minified = ${valueMinCssSize}${unitMinCssSize}\n`);
}
