// Lazy loader for models.json to reduce initial bundle size
let modelsCache: any = null;

export async function loadModels() {
  if (modelsCache) {
    return modelsCache;
  }

  const models = await import('./models.json');
  modelsCache = models.default;
  return modelsCache;
}

export function getModelsSync() {
  if (!modelsCache) {
    // Fallback for synchronous access - will be replaced with async loading
    const models = require('./models.json');
    modelsCache = models;
  }
  return modelsCache;
}