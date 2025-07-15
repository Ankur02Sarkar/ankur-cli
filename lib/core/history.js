let history = [];
let historyIndex = -1;

export function addToHistory(command) {
  if (command?.trim()) {
    history.push(command);
  }
  historyIndex = history.length;
}

export function getPrevious() {
  if (historyIndex > 0) {
    historyIndex--;
  }
  return history[historyIndex] ?? '';
}

export function getNext() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
  }
  return history[historyIndex] ?? '';
}

export function resetIndex() {
  historyIndex = history.length;
}