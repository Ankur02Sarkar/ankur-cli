import { getColors } from '../core/colors.js';
import ora from 'ora';

export async function easter(args = []) {
  const cmd = args[0]?.toLowerCase() ?? '';
  const colors = getColors();

  switch (cmd) {
    case 'fortune':
      const fortunes = [
        'You will build great things.',
        'Innovation awaits you.',
        'Code is poetry.'
      ];
      const fortune = fortunes[Math.floor(Math.random() * fortunes.length)] ?? 'Try again.';
      console.log(colors.info(fortune));
      break;
    case 'matrix':
      const spinner = ora({ text: 'Entering the Matrix...', spinner: 'earth' }).start();
      await new Promise(resolve => setTimeout(resolve, 3000));
      spinner.stop();
      console.log(colors.primary('Wake up, Neo...'));
      break;
    case 'sudo':
      console.log(colors.warning('Access granted. You are now root. Just kidding!'));
      break;
    default:
      console.log(colors.error('Unknown easter egg. Try fortune, matrix, or sudo.'));
  }
}