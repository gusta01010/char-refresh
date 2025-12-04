const fs = require('fs');
const path = require('path');

module.exports.info = {
  id: 'characters-autorefresh',
  name: 'Auto-refresh Character folder',
  description: 'Signals the UI whenever the character folder changes'
};

/**
 * @param {import('express').Router} router Express router
 * @returns {Promise<void>}
 */
module.exports.init = async function init(router) {
  const CHAR_DIR = path.resolve(__dirname, '..', '..', 'data', 'default-user', 'characters');
  let lastChange = Date.now();

  // Initialize cache of known files to distinguish between new files and atomic updates
  const knownFiles = new Set();
  try {
    if (fs.existsSync(CHAR_DIR)) {
      fs.readdirSync(CHAR_DIR).forEach(file => {
        if (file.match(/\.(png|json|webp)$/i)) {
          knownFiles.add(file);
        }
      });
    }
  } catch (e) {
    console.error('[auto-refresh] Error reading char dir:', e);
  }

  router.get('/last-change', (_req, res) =>
    res.json({ lastChange })
  );

  console.log('[auto-refresh] REST GET /api/plugins/characters-autorefresh/last-change registered');

  // use native fs.watch instead of chokidar
  let debounceTimer;
  fs.watch(CHAR_DIR, (eventType, filename) => {
    if (!filename || !filename.match(/\.(png|json|webp)$/i)) return;

    // ignore 'change' events (modifications)
    if (eventType === 'change') return;

    // check if it's a real add/remove or just an atomic save (modification)
    const filePath = path.join(CHAR_DIR, filename);
    const exists = fs.existsSync(filePath);
    const wasKnown = knownFiles.has(filename);

    // if file exists and was already known, it's a modification (likely atomic save) -> Ignore
    if (exists && wasKnown) return;

    // if file doesn't exist and wasn't known, it's irrelevant -> Ignore
    if (!exists && !wasKnown) return;

    // update cache
    if (exists) knownFiles.add(filename);
    else knownFiles.delete(filename);
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`[auto-refresh] ${exists ? 'Added' : 'Removed'}: ${filename}`);
      lastChange = Date.now();
    }, 300);
  });

  console.log('[auto-refresh] Watching for character changes in:', CHAR_DIR);
};