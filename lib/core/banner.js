import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';

export async function displayBanner() {
  return new Promise((resolve, reject) => {
    figlet('Ankur', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    }, (err, data) => {
      if (err) {
        console.log(chalk.red('Error generating banner:'));
        console.log(err?.message ?? 'Unknown error');
        resolve(); // Continue despite error
        return;
      }
      if (!data) {
        console.log(chalk.yellow('Warning: No banner data generated.'));
        resolve();
        return;
      }
      const colored = gradient.pastel.multiline(data);
      console.log(colored);
      console.log(chalk.green('Welcome to Ankur’s Interactive Portfolio'));
      console.log(chalk.green('Bengaluru, India | npx ankur'));
      console.log(chalk.green('Type `help` for commands.'));
      resolve();
    });
  });
}