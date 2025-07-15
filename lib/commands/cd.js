import * as fs from '../core/fs.js';
import { getColors } from '../core/colors.js';

export async function cd(args = []) {
  const target = args[0] ?? '/';
  const success = await fs.setCurrentDir(target);
  if (success) {
    console.log(getColors().info(`Changed to ${target}`));
  } else {
    console.log(getColors().error(`Invalid directory: ${target}`));
  }
}