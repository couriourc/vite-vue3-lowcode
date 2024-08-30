/*
 * @Author: 卜启缘
 * @Date: 2021-06-13 22:07:29
 * @LastEditTime: 2021-07-13 21:25:59
 * @LastEditors: 卜启缘
 * @Description: 当前页面配置
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\right-attribute-panel\components\page-setting\pageSetting.tsx
 */
import { defineComponent } from 'vue';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
  ElSwitch,
} from 'element-plus';
import { useVisualData } from '@/visual-editor/hooks/useVisualData';

export const PageSetting = defineComponent({
  setup() {
    const { currentPage, apis } = useVisualData();

    const pageConfig = currentPage.value.config;
    console.log('apis', apis);
    return () => (
      <>
        <ElForm>
          <ElFormItem label="路由切换时缓存本页面">
            <ElSwitch v-model={pageConfig.keepAlive} />
          </ElFormItem>
          <ElFormItem label="预加载数据模型">
            <ElSelect>
              {apis.value.map((api) => (
                <ElOption key={api.key} label={api.name} value={api.key}></ElOption>
              ))}
            </ElSelect>
            .
          </ElFormItem>
          <ElFormItem label={'页面大小'}>
            <div class={'flex'}>
              <ElInputNumber placeholder={'宽'} />
              <ElInputNumber placeholder={'高'} />
            </div>
          </ElFormItem>
          <ElFormItem label="背景图片">
            <ElInput v-model={pageConfig.bgImage} placeholder={'图片地址'} clearable />
          </ElFormItem>
          <div class={'w-full flex flex-col'}>
            <h3 class={'text-12px mb-12px'}>自定义样式</h3>
            <ElInput
              type={'textarea'}
              rows={5}
              placeholder={'css 代码，无法实时预览'}
              v-model={currentPage.value.config.css}
            ></ElInput>
          </div>
        </ElForm>
      </>
    );
  },
});
