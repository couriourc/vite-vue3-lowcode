<!--业务组件-->
<template>
  <div> 上传业务组件</div>
</template>

<script lang="ts">
  import { Upload } from '@element-plus/icons-vue';

  export default {
    name: 'CustomComponent',
    label: '业务组件',
    order: 5,
    icon: Upload,
  };
</script>

<style scoped></style>
