const fs = require('node:fs/promises');
const path = require('node:path');

const inputPath = path.join(process.cwd(), 'src', 'input.css');

let lastEvent = 0;

(async () => {
  try {
    const watcher = fs.watch(path.join(process.cwd(), 'src', 'index.html'));
    for await (const event of watcher) {
      if (event.eventType === 'change') {
        if (Date.now() - lastEvent > 2000 || lastEvent === 0) {
          lastEvent = Date.now();
          await new Promise((resolve) =>
            setTimeout(async () => {
              await fs.appendFile(inputPath, ' ');
              resolve();
            }, 150)
          );
        }
      }
    }
  } catch (err) {
    if (err.name === 'AbortError') return;
    throw err;
  }
})();
