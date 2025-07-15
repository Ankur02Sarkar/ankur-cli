import enquirer from 'enquirer';
import { getColors } from '../core/colors.js';

export async function contact(args = []) {
  const colors = getColors();
  try {
    const response = await enquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your Name:'
      },
      {
        type: 'input',
        name: 'email',
        message: 'Your Email:'
      },
      {
        type: 'input',
        name: 'message',
        message: 'Message:'
      }
    ]);
    if (response?.name && response?.email && response?.message) {
      // Simulate sending
      console.log(colors.info('Thank you! Your message has been sent.'));
      // In real scenario, integrate with email API
    } else {
      console.log(colors.warning('Contact form incomplete.'));
    }
  } catch (error) {
    console.log(colors.error('Error in contact form:'));
    console.log(error?.message ?? 'Unknown error');
  }
}