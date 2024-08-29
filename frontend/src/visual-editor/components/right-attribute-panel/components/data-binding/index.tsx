/*
 * @Author: 卜启缘
 * @Date: 2021-06-10 16:23:06
 * @LastEditTime: 2021-07-11 18:36:24
 * @LastEditors: 卜启缘
 * @Description: 组件属性编辑器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\attr-editor\index.tsx
 */
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

export const Databinding = defineComponent({
  setup() {
    return () => (
      <>
        <ElButton type={'primary'} plain icon={Plus}>
          添加模型绑定
        </ElButton>
      </>
    );
  },
});
