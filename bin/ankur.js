#!/usr/bin/env bun

import { startShell } from '../lib/core/shell.js';

async function main() {
  try {
    await startShell();
  } catch (error) {
    console.error('Error starting CLI:', error?.message ?? 'Unknown error');
    process.exit(1);
  }
}

main();