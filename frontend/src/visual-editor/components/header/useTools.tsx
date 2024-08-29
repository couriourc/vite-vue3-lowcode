/**
 * @name: tools
 * @author: 卜启缘
 * @date: 2021/5/7 10:46
 * @description：tools
 * @update: 2021/5/7 10:46
 */
import { reactive } from 'vue';
import { ElMessage, ElRadio, ElRadioGroup } from 'element-plus';
import { useClipboard } from '@vueuse/core';
import {
  Delete,
  DocumentCopy,
  Download,
  Position,
  RefreshLeft,
  RefreshRight,
  Upload,
} from '@element-plus/icons-vue';
import downloadjs from 'downloadjs';
import { localKey, useVisualData } from '@/visual-editor/hooks/useVisualData';
import { useModal } from '@/visual-editor/hooks/useModal';
import MonacoEditor from '@/visual-editor/components/common/monaco-editor/MonacoEditor';
import 'element-plus/es/components/message/style/css';

export const useTools = () => {
  const { jsonData, updatePage, currentPage, overrideProject } = useVisualData();
  const state = reactive({
    coverRadio: 'current',
    importJsonValue: '',
  });
  const importJsonChange = (value) => {
    state.importJsonValue = value;
  };

  return [
    {
      title: '导入JSON',
      icon: Upload,
      onClick: () => {
        useModal({
          title: '导入JSON',
          props: {
            width: 642,
          },
          content: () => (
            <>
              <ElRadioGroup v-model={state.coverRadio}>
                <ElRadio label="current">覆盖当前页面</ElRadio>
                <ElRadio label="all">覆盖整个项目</ElRadio>
              </ElRadioGroup>
              <MonacoEditor
                onChange={importJsonChange}
                code={JSON.stringify(jsonData)}
                layout={{ width: 600, height: 600 }}
              />
            </>
          ),
          onConfirm: () => {
            const isCoverCurrent = state.coverRadio == 'current';
            // 覆盖当前页面
            if (isCoverCurrent) {
              updatePage({
                oldPath: currentPage.value.path,
                page: JSON.parse(state.importJsonValue),
              });
            } else {
              // 覆盖整个项目
              overrideProject(JSON.parse(state.importJsonValue));
            }
            ElMessage({
              showClose: true,
              type: 'success',
              duration: 2000,
              message: isCoverCurrent ? '成功覆盖当前页面' : '成功覆盖整个项目',
            });
          },
        });
      },
    },
    {
      title: '导出JSON',
      icon: Download,
      onClick: () => {
        const data = JSON.stringify(jsonData);
        const { copy } = useClipboard({ source: data });
        copy()
          .then(() => ElMessage.success('复制成功'))
          .catch((err) => ElMessage.error(`复制失败：${err}`));
        downloadjs(data, 'config.json');
      },
    },
    {
      title: '复制页面',
      icon: DocumentCopy,
      onClick: () => {
        ElMessage({
          showClose: true,
          type: 'info',
          duration: 2000,
          message: '敬请期待！',
        });
      },
    },
    {
      title: '撤销',
      icon: RefreshLeft,
      onClick: () => {
        ElMessage({
          showClose: true,
          type: 'info',
          duration: 2000,
          message: '敬请期待！',
        });
      },
    },
    {
      title: '重做',
      icon: RefreshRight,
      onClick: () => {
        ElMessage({
          showClose: true,
          type: 'info',
          duration: 2000,
          message: '敬请期待！',
        });
      },
    },
    {
      title: '清空页面',
      icon: Delete,
      onClick: () => {
        ElMessage({
          showClose: true,
          type: 'info',
          duration: 2000,
          message: '敬请期待！',
        });
      },
    },
    {
      title: '预览',
      icon: Position,
      onClick: () => {
        localStorage.setItem(localKey, JSON.stringify(jsonData));
        window.open(location.href.replace('/#/', '/preview/#/'));
      },
    },
  ];
};
