import { getColors, boxText } from '../core/colors.js';

export async function help(args = []) {
  const commandList = [
    { cmd: 'ls', desc: 'List available sections/directories' },
    { cmd: 'cd [section]', desc: 'Enter a section' },
    { cmd: 'cat [file]', desc: 'View file/section details' },
    { cmd: 'search [term]', desc: 'Search portfolio for a skill or keyword' },
    { cmd: 'theme [name]', desc: 'Change color/theme of the CLI' },
    { cmd: 'music', desc: 'Play a background soundtrack (ASCII visualizer)' },
    { cmd: 'contact', desc: 'Fill out interactive contact form' },
    { cmd: 'download resume', desc: 'Get your PDF resume or link' },
    { cmd: 'help', desc: 'Show all commands and shortcuts' },
    { cmd: 'exit', desc: 'Say goodbye with style' }
  ];

  let output = 'Available Commands:\n';
  commandList.forEach(({ cmd, desc }) => {
    output += `${getColors().primary(cmd)} - ${desc}\n`;
  });

  console.log(boxText(output, { borderColor: 'green' }));
}