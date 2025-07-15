import player from 'play-sound';
import { getColors } from '../core/colors.js';
import path from 'path';

const MUSIC_DIR = path.join(process.cwd(), 'portfolio/music');
let currentPlayer = null;

export async function music(args = []) {
  const command = args[0]?.toLowerCase() ?? 'play';
  const colors = getColors();

  if (command === 'stop') {
    if (currentPlayer) {
      currentPlayer.kill();
      currentPlayer = null;
      console.log(colors.info('Music stopped.'));
    } else {
      console.log(colors.warning('No music playing.'));
    }
    return;
  }

  // Assume play, pick a random or first mp3
  try {
    const files = await fs.promises.readdir(MUSIC_DIR);
    const mp3 = files?.find(f => f.endsWith('.mp3')) ?? null;
    if (!mp3) {
      console.log(colors.error('No music files found in portfolio/music.'));
      return;
    }
    const filePath = path.join(MUSIC_DIR, mp3);
    currentPlayer = player()({ file: filePath });
    console.log(colors.info(`Playing ${mp3}... Type 'music stop' to stop.`));
  } catch (error) {
    console.log(colors.error('Error playing music:'));
    console.log(error?.message ?? 'Unknown error');
  }
}