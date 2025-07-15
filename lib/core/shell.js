import readline from 'readline';
import { displayBanner } from './banner.js';
import { getColors } from './colors.js';
import * as fs from './fs.js';
import * as history from './history.js';
import * as commands from '../commands/index.js'; // Will import all commands later

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: getColors().primary('> ')
});

export async function startShell() {
  await displayBanner();
  rl.prompt();

  rl.on('line', async (line) => {
    const trimmed = line?.trim() ?? '';
    if (!trimmed) {
      rl.prompt();
      return;
    }
    history.addToHistory(trimmed);
    const [cmd, ...args] = trimmed.split(/\s+/);
    try {
      if (commands[cmd]) {
        await commands[cmd](args);
      } else {
        const clrs = getColors();
        console.log(clrs.error(`Unknown command: ${cmd}`));
        console.log(clrs.info('Type "help" for available commands.'));
      }
    } catch (error) {
      const clrs = getColors();
      console.log(clrs.error('Error executing command:'));
      console.log(error?.message ?? 'Unknown error');
    }
    rl.prompt();
  });

  rl.on('close', () => {
    console.log(getColors().primary('Goodbye!'));
    process.exit(0);
  });

  // Handle history navigation
  process.stdin.on('keypress', (char, key) => {
    if (key?.name === 'up') {
      rl.write(null, { name: 'deleteLine' });
      rl.write(history.getPrevious());
    } else if (key?.name === 'down') {
      rl.write(null, { name: 'deleteLine' });
      rl.write(history.getNext());
    }
  });
}