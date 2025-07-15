import * as fs from '../core/fs.js';
import { getColors } from '../core/colors.js';

export async function ls(args = []) {
  const target = args[0] ?? await fs.getCurrentDir();
  const items = await fs.ls(target);
  if (items?.length === 0) {
    console.log(getColors().warning('No items found.'));
    return;
  }
  items.forEach(item => {
    const clrs = getColors();
    const prefix = item.isDir ? clrs.primary('[DIR] ') : clrs.secondary('[FILE] ');
    console.log(prefix + item.name);
  });
}