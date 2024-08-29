import Mustache from 'mustache';
import * as r from 'radash';
import { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import type { VisualEditorModelValue } from '@/visual-editor/visual-editor.utils';

export class TemplateParser {
  static parser = new TemplateParser();

  parse(
    s: string,
    appData: Readonly<VisualEditorModelValue>,
    curPage: VisualEditorModelValue['pages'][string],
    route: RouteLocationNormalizedLoadedGeneric,
  ) {
    return Mustache.render(s, {
      app: r.pick(appData, ['id']),
      page: r.pick(curPage, ['path', 'title', 'path']),
      route: r.pick(route, ['query', 'path', 'params']),
    });
  }
}
