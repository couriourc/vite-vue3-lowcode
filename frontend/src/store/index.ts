import { createPinia } from 'pinia';
import type { App } from 'vue';

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store as any);
}

export { store };
