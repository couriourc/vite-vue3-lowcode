/*
 * @Author: 卜启缘
 * @Date: 2021-06-10 16:23:06
 * @LastEditTime: 2021-07-11 18:36:24
 * @LastEditors: 卜启缘
 * @Description: 组件属性编辑器
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\attr-editor\index.tsx
 */
import { defineComponent } from 'vue';
import { ElButton, ElIcon } from 'element-plus';
import { Close, Plus } from '@element-plus/icons-vue';
import { useVisualData } from '@/visual-editor/hooks/useVisualData';
import { ModelSelector } from '@/visual-editor/components/right-attribute-panel/components/model-selector';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

export const Databinding = defineComponent({
  setup() {
    const { currentBlock, overrideCurrentBlockModel } = useVisualData();
    const AddBinded = defineComponent({
      setup() {
        let selected;
        return () => {
          return (
            <div class={'flex w-full space-x-2'}>
              <ModelSelector
                onSelect={(val: string, cur) => {
                  const nowModel = currentBlock.value.model ?? {};
                  nowModel[val] = cur;
                  console.log(val);
                  selected = nowModel;
                }}
              />
              <ElButton
                circle
                type={'primary'}
                plain
                onClick={() => {
                  overrideCurrentBlockModel(selected);
                }}
                icon={Plus}
              ></ElButton>
            </div>
          );
        };
      },
    });

    const BindedList = () => {
      return (
        <ul class={'flex flex-col gap-4px mt-12px'}>
          {Object.keys(currentBlock.value.model ?? {}).map((modelKey) => {
            return (
              <li class={'group '}>
                <Alert class={'relative'}>
                  <span
                    class={
                      'group-hover:visible invisible cursor-pointer top-12px absolute right-12px'
                    }
                    onClick={() => {
                      delete currentBlock.value.model[modelKey];
                    }}
                  >
                    <ElIcon>
                      <Close />
                    </ElIcon>
                  </span>
                  <AlertTitle>{currentBlock.value.model[modelKey]?.name}</AlertTitle>
                  <AlertDescription>
                    <div class="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        for="terms"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        局部变量
                      </label>
                    </div>
                  </AlertDescription>
                </Alert>
              </li>
            );
          })}
        </ul>
      );
    };
    return () => (
      <div class={'flex flex-col'}>
        <AddBinded />
        <BindedList />
      </div>
    );
  },
});
