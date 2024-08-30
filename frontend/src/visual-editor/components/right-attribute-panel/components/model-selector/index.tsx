import { defineComponent } from 'vue';
import { useVisualData } from '@/visual-editor/hooks/useVisualData';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const ModelSelector = defineComponent({
  props: {
    onSelect: { type: Function, default: () => () => null },
  },
  setup(props) {
    const { models } = useVisualData();
    return () => (
      <Select
        onTriggerChange={(value) => {
          console.log(value);
          props.onSelect?.(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="选择一个数据模型依赖" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>全局数据源模型</SelectLabel>
            {models.value.map((item) => (
              <SelectItem value={item.key} key={item.key}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
});
