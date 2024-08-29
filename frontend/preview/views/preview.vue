<!--
 * @Author: 卜启缘
 * @Date: 2021-06-01 09:45:21
 * @LastEditTime: 2021-07-13 21:59:22
 * @LastEditors: 卜启缘
 * @Description: 效果预览页面
 * @FilePath: \vite-vue3-lowcode\preview\views\preview.vue
-->
<template>
  <template v-for="outItem in blocks" :key="outItem._vid">
    <slot-item :actions="actions" :element="outItem" :models="models" />
  </template>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import { Toast } from 'vant';
  import { RuntimeImporter } from '@shared/dynamicImport.plugin';
  import { TemplateParser } from '@shared/parser.plugin';
  import { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
  import router from '../router';
  import { KEYS } from '../enum';
  import SlotItem from './slot-item.vue';
  import type { VisualEditorModelValue } from '@/visual-editor/visual-editor.utils';
  import { CacheEnum } from '@/enums';

  export default defineComponent({
    name: 'Preview',
    components: {
      SlotItem,
    },
    setup() {
      const jsonData: VisualEditorModelValue = JSON.parse(
        localStorage.getItem(CacheEnum.PAGE_DATA_KEY) as string,
      );

      if (!jsonData || !Object.keys(jsonData.pages)) {
        Toast.fail('当前没有可以预览的页面！');
      }

      const route = router.currentRoute;

      const currentPage = jsonData.pages[route.value.path];
      console.log('currentPage:', currentPage, jsonData);

      const state = reactive({
        blocks: currentPage?.blocks,
      });

      // 如果当前页面路由匹配不到，则重定向到首页
      if (!state.blocks) {
        router.replace('/');
      }
      const styleNode = document.createElement('style');
      onMounted(() => {
        if (currentPage?.config) {
          const { css, cssModules, jsModules } = currentPage.config;
          RuntimeImporter.cachedRuntimeImports
            .registerRuntimeModules({
              js: jsModules ?? [],
              css: cssModules ?? [],
            })
            .then(() => {
              const bodyStyleStr = TemplateParser.parser.parse(
                css ?? '',
                jsonData,
                currentPage,
                route as any as RouteLocationNormalizedLoadedGeneric,
              );
              styleNode.innerHTML = bodyStyleStr ?? '';
              styleNode.setAttribute('type', 'text/css');
              document.head.appendChild(styleNode);
            });
        }
      });
      onUnmounted(() => {
        styleNode.remove();
      });
      //  注入 当前页面数据
      provide(KEYS.INJECT_PAGE_DATA, currentPage);
      return {
        ...toRefs(state),
        actions: jsonData.actions,
        models: jsonData.models,
      };
    },
  });
</script>
