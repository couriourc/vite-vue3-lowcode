import { defineComponent } from 'vue';
import { ElOption, ElSelect } from 'element-plus';
import { useVisualData } from '@/visual-editor/hooks/useVisualData';

export const ModelSelector = defineComponent({
  setup() {
    const { models } = useVisualData();
    return () => (
      <ElSelect placeholder="Select">
        {models.value.map((api) => (
          <ElOption key={api.name} label={api.name} value={api.name} />
        ))}
      </ElSelect>
    );
  },
});
