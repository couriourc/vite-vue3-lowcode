import { importModule } from 'runtime-import';

export class RuntimeImporter {
  static cachedRuntimeImports = new RuntimeImporter();

  async registerRuntimeModules({ js, css }: { js: string[]; css: string[] }) {
    await importModule({
      js,
      css,
      crossOrigin: '',
      umd: true,
    });
  }
}
