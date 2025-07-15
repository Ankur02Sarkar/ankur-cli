import fs from 'fs/promises';
import path from 'path';
import { getColors } from '../core/colors.js';

const PORTFOLIO_ROOT = path.join(process.cwd(), 'portfolio');

export async function search(args = []) {
  const term = args.join(' ').toLowerCase();
  if (!term) {
    console.log(getColors().error('Please provide a search term.'));
    return;
  }
  const matches = await findMatches(PORTFOLIO_ROOT, term);
  if (matches?.length === 0) {
    console.log(getColors().warning('No matches found.'));
    return;
  }
  matches.forEach(({ file, lines }) => {
    console.log(getColors().primary(`In ${path.relative(PORTFOLIO_ROOT, file)}:`));
    lines.forEach(line => console.log(`- ${line}`));
  });
}

async function findMatches(dir, term, depth = 0) {
  if (depth > 5) return [];
  let results = [];
  try {
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items ?? []) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        results = [...results, ...(await findMatches(fullPath, term, depth + 1))];
      } else if (item.isFile()) {
        const content = await fs.readFile(fullPath, 'utf8');
        const lines = content.split('\n').filter(line => line.toLowerCase().includes(term));
        if (lines.length > 0) {
          results.push({ file: fullPath, lines });
        }
      }
    }
  } catch {}
  return results;
}