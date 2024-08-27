/*
 * @Author: 卜启缘
 * @Date: 2021-06-13 22:07:29
 * @LastEditTime: 2021-07-13 21:25:59
 * @LastEditors: 卜启缘
 * @Description: 当前页面配置
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\page-setting\pageSetting.tsx
 */
import { defineComponent } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSwitch } from 'element-plus';

import { useVisualData } from '@/visual-editor/hooks/useVisualData';
import MonacoEditor from '@/visual-editor/components/common/monaco-editor/MonacoEditor';

export const PageSetting = defineComponent({
  setup() {
    const { currentPage } = useVisualData();

    const pageConfig = currentPage.value.config;
    const baseCss: string = pageConfig.css ?? '';
    return () => (
      <>
        <ElForm>
          <ElFormItem label="路由切换时缓存本页面">
            <ElSwitch v-model={pageConfig.keepAlive} />
          </ElFormItem>
          <ElFormItem label="背景图片">
            <ElInput v-model={pageConfig.bgImage} placeholder={'图片地址'} clearable />
          </ElFormItem>
          <div class={'w-full flex flex-col'}>
            <h3 class={'text-12px mb-12px'}>自定义样式</h3>
            <MonacoEditor
              code={baseCss}
              onChange={(value) => {
                pageConfig.css = value;
              }}
              options={{
                lineNumbers: 'off',
              }}
              language={'css'}
              layout={{
                width: 320,
                height: 300,
              }}
            />
          </div>
        </ElForm>
      </>
    );
  },
});
