<template>
  <el-config-provider :locale="zhCn">
    <router-view #="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
  import { provide } from 'vue';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  import * as r from 'radash';
  import { initVisualData, injectKey, localKey } from '@/visual-editor/hooks/useVisualData';

  const router = useRouter();
  const route = useRoute();
  if (!route.query.pageId) {
    const pageId = `app_${r.uid(10)}`;
    router.replace({
      path: route.path,
      query: {
        ...(route.query ?? {}),
        pageId,
      },
    });
    route.query.pageId = pageId;
  }

  const visualData = initVisualData(route.query.pageId as string);
  // 注入可视化编辑器所有配置
  provide(injectKey, visualData);

  const { jsonData } = visualData;

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem(localKey, JSON.stringify(jsonData));
  });
</script>

<style lang="scss">
  @import 'style/common';
</style>
