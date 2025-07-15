import fs from 'fs/promises';
import path from 'path';

const PORTFOLIO_ROOT = path.join(process.cwd(), 'portfolio');

let currentDir = '';

export async function getCurrentDir() {
  return '/' + currentDir;
}

export async function setCurrentDir(newDir) {
  if (newDir === '/' || newDir === '') {
    currentDir = '';
    return true;
  }
  let normDir = newDir.replace(/^\//, '');
  let newPath = path.normalize(path.join(currentDir, normDir));
  if (newPath.startsWith('..')) return false;
  let fullPath = path.join(PORTFOLIO_ROOT, newPath);
  if (await isDirectory(fullPath)) {
    currentDir = newPath;
    return true;
  }
  return false;
}

export async function ls(dir = currentDir) {
  let target = dir ?? currentDir;
  let normTarget = target.replace(/^\//, '');
  let relPath = path.normalize(path.join(currentDir, normTarget));
  if (relPath.startsWith('..')) return [];
  let fullPath = path.join(PORTFOLIO_ROOT, relPath);
  try {
    const items = await fs.readdir(fullPath, { withFileTypes: true });
    return items?.map(item => ({
      name: item.name,
      isDir: item.isDirectory()
    })) ?? [];
  } catch {
    return [];
  }
}

export async function cat(filePath) {
  let normPath = filePath.replace(/^\//, '');
  let relPath = path.normalize(path.join(currentDir, normPath));
  if (relPath.startsWith('..')) return null;
  let fullPath = path.join(PORTFOLIO_ROOT, relPath);
  try {
    const content = await fs.readFile(fullPath, 'utf8');
    return content ?? '';
  } catch {
    return null;
  }
}

export async function isDirectory(dirPath) {
  let normPath = dirPath.replace(/^\//, '');
  let relPath = path.normalize(path.join(currentDir, normPath));
  if (relPath.startsWith('..')) return false;
  let fullPath = path.join(PORTFOLIO_ROOT, relPath);
  try {
    const stat = await fs.stat(fullPath);
    return stat?.isDirectory() ?? false;
  } catch {
    return false;
  }
}