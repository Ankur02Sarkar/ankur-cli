import { setTheme, getColors } from '../core/colors.js';

export async function theme(args = []) {
  const themeName = args[0]?.toLowerCase() ?? '';
  if (!themeName) {
    const colors = getColors();
    console.log(colors.warning('Please specify a theme: default, dark, light, hacker, solarized'));
    return;
  }
  const success = setTheme(themeName);
  const colors = getColors();
  if (success) {
    console.log(colors.info(`Theme changed to ${themeName}`));
  } else {
    console.log(colors.error(`Invalid theme: ${themeName}`));
  }
}