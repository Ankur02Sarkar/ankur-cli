import * as fs from '../core/fs.js';
import { getColors, boxText } from '../core/colors.js';

export async function cat(args = []) {
  const file = args[0] ?? '';
  if (!file) {
    console.log(getColors().error('Please specify a file.'));
    return;
  }
  const content = await fs.cat(file);
  if (content === null) {
    console.log(getColors().error(`File not found: ${file}`));
    return;
  }
  console.log(boxText(content, { borderColor: 'blue' }));
}