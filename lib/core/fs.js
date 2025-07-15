import fs from 'fs/promises';
import path from 'path';

const PORTFOLIO_ROOT = path.join(process.cwd(), 'portfolio');

let currentDir = '/';

export async function getCurrentDir() {
  return currentDir;
}

export async function setCurrentDir(newDir) {
  const resolved = resolvePath(newDir);
  if (await isDirectory(resolved)) {
    currentDir = path.relative(PORTFOLIO_ROOT, resolved) || '/';
    return true;
  }
  return false;
}

export async function ls(dir = currentDir) {
  const resolved = resolvePath(dir);
  try {
    const items = await fs.readdir(resolved, { withFileTypes: true });
    return items?.map(item => ({
      name: item.name,
      isDir: item.isDirectory()
    })) ?? [];
  } catch {
    return [];
  }
}

export async function cat(filePath) {
  const resolved = resolvePath(filePath);
  try {
    const content = await fs.readFile(resolved, 'utf8');
    return content ?? '';
  } catch {
    return null;
  }
}

export async function isDirectory(dirPath) {
  const resolved = resolvePath(dirPath);
  try {
    const stat = await fs.stat(resolved);
    return stat?.isDirectory() ?? false;
  } catch {
    return false;
  }
}

function resolvePath(input) {
  return path.resolve(PORTFOLIO_ROOT, currentDir === '/' ? '.' : currentDir, input);
}