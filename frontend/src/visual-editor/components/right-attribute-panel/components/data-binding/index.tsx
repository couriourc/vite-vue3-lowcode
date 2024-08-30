/*
 * @Author: 卜启缘
 * @Date: 2021-06-10 16:23:06
 * @LastEditTime: 2021-07-11 18:36:24
 * @LastEditors: 卜启缘
 * @Description: 组件属性编辑器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\attr-editor\index.tsx
 */
import { defineComponent } from 'vue';
import { useToggle } from '@vueuse/core';
import { ElButton } from 'element-plus';
import { Close, Plus } from '@element-plus/icons-vue';
import { useVisualData } from '@/visual-editor/hooks/useVisualData';
import { ModelSelector } from '@/visual-editor/components/right-attribute-panel/components/model-selector';

export const Databinding = defineComponent({
  setup() {
    const [state, toggle] = useToggle();
    const { currentBlock } = useVisualData();
    const selected = ref<string | undefined>();
    const BindedList = () => {
      return (
        <>
          <ModelSelector v-model={selected} />
          <ElButton type={'primary'} plain onClick={() => toggle()} icon={Plus}>
            添加模型绑定
          </ElButton>
          {Object.keys(currentBlock.value.model ?? {}).map((modelKey) => {
            return <>{modelKey}</>;
          })}
        </>
      );
    };
    const AddBinded = () => {
      return (
        <ElButton type={'primary'} plain onClick={() => toggle()} icon={Close}>
          取消
        </ElButton>
      );
    };
    return () => (
      <>
        <AddBinded />
        {state}
        <BindedList />
      </>
    );
  },
});
