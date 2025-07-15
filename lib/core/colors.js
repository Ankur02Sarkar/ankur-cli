import chalk from 'chalk';
import gradient from 'gradient-string';

let currentTheme = 'default';

const themes = {
  default: {
    primary: chalk.green,
    secondary: chalk.blue,
    error: chalk.red,
    warning: chalk.yellow,
    info: chalk.cyan,
    gradient: gradient.pastel
  },
  dark: {
    primary: chalk.white,
    secondary: chalk.gray,
    error: chalk.red,
    warning: chalk.yellow,
    info: chalk.cyan,
    gradient: gradient.mind
  },
  light: {
    primary: chalk.black,
    secondary: chalk.blue,
    error: chalk.red,
    warning: chalk.yellow,
    info: chalk.cyan,
    gradient: gradient.retro
  },
  hacker: {
    primary: chalk.green,
    secondary: chalk.green.dim,
    error: chalk.red,
    warning: chalk.yellow,
    info: chalk.green,
    gradient: gradient.atlas
  },
  solarized: {
    primary: chalk.hex('#859900'),
    secondary: chalk.hex('#268bd2'),
    error: chalk.hex('#dc322f'),
    warning: chalk.hex('#b58900'),
    info: chalk.hex('#2aa198'),
    gradient: gradient.cristal
  }
};

export function setTheme(themeName) {
  if (themes[themeName]) {
    currentTheme = themeName;
    return true;
  }
  return false;
}

export function getColors() {
  return themes[currentTheme] ?? themes.default;
}

export function gradientText(text) {
  const theme = getColors();
  return text ? theme.gradient(text) : '';
}

export function boxText(text, options = {}) {
  const boxen = require('boxen').default ?? (() => text);
  return boxen(text, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    ...options
  });
}