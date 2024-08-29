<template>
  <router-view #="{ Component, route }">
    <keep-alive ref="keepAliveRef">
      <component :is="Component" :key="route.path" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { KEYS } from './enum';
  import { CacheEnum } from '@/enums';
  import { VisualEditorModelValue } from '@/visual-editor/visual-editor.utils';

  export default defineComponent({
    name: 'App',
    setup() {
      const keepAliveRef = ref();
      const route = useRoute();
      const jsonData: VisualEditorModelValue = JSON.parse(
        localStorage.getItem(CacheEnum.PAGE_DATA_KEY) as string,
      );
      if (!document.body.classList.contains(jsonData.id ?? ''))
        document.body.classList.add(jsonData.id ?? '');
      // 不需要缓存的页面
      const notNeedcachePages = Object.keys(jsonData.pages).filter(
        (key) => !jsonData.pages[key].config.keepAlive,
      );
      console.log('notNeedcachePages:', notNeedcachePages);
      provide<VisualEditorModelValue>(KEYS.INJECT_DATA, jsonData);
      watch(
        () => route.path,
        (path) => {
          if (notNeedcachePages.includes(path)) {
            // 获取keep-alive缓存
            const routeCaches = keepAliveRef.value?.$?.__v_cache;
            console.log('keep-alive cache', path, routeCaches);
            // 从keep-alive的缓存中删除不需要缓存的路由
            routeCaches.delete(path);
          }
        },
      );

      return { keepAliveRef };
    },
  });
</script>

<style>
  body::-webkit-scrollbar {
    width: 0;
  }
</style>
