<!--
 * @Author: 卜启缘
 * @Date: 2021-06-12 22:18:48
 * @LastEditTime: 2021-07-14 10:17:34
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\preview\views\slot-item.vue
-->
<template>
  <div class="__slot-item">
    <comp-render :element="element" v-on="events">
      <template v-for="(value, key) in element.props?.slots" :key="key" #[key]>
        <template v-for="item in value?.children" :key="item._vid">
          <slot-item :actions="actions" :element="item" :models="models" />
        </template>
      </template>
    </comp-render>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, PropType } from 'vue';
  import _ from 'underscore';
  import { Interpreter } from 'eval5';
  import request from '../utils/http/request';
  import { ContentTypeEnum } from '../utils/http/httpEnum';
  import { $bus } from '../bus';
  import { safe } from '../utils';
  import CompRender from './comp-render';
  import type {
    FetchApiItem,
    VisualEditorActions,
    VisualEditorBlockData,
    VisualEditorModel,
  } from '@/visual-editor/visual-editor.utils';
  import { useAnimate } from '@/hooks/useAnimate';
  import { FieldTypesValue } from '@/visual-editor/hooks/useVisualData';

  export default defineComponent({
    name: 'SlotItem',
    components: { CompRender },
    props: {
      element: {
        type: [Object] as PropType<VisualEditorBlockData>,
        default: () => ({}),
      },
      actions: {
        type: Object as PropType<VisualEditorActions>,
        default: () => ({}),
      },
      models: {
        type: Object as PropType<VisualEditorModel[]>,
        default: () => ({}),
      },
    },
    setup(props) {
      const route = useRoute();

      // 处理数据，链接 Models

      function handleDataEntity(entity) {
        switch (entity.type) {
          case FieldTypesValue.LocalStorage:
            return safe(() => JSON.parse(localStorage.getItem(entity.name)!));
          case FieldTypesValue.SessionStorage:
            return safe(() => JSON.parse(sessionStorage.getItem(entity.name)!));
          case FieldTypesValue.Query:
            return _.get(route.query, entity.name);
        }
      }

      function handleData(link: FetchApiItem['data'], key: keyof FetchApiItem['data']) {
        let data = {};
        props.models.forEach((model) => {
          if (link[key].includes(model.key)) {
            //            console.log();
            data = model.entitys.reduce((collection, entity) => {
              return {
                ...collection,
                [entity.name]: handleDataEntity(entity) ?? entity.value,
              };
            }, {});
          }
        });

        return data;
      }

      const interpreter = new Interpreter(window);

      const events = props.element.actions.reduce((prev, curr) => {
        prev[curr.event] = async () => {
          for (const handle of curr.handle) {
            const [scopeType, actionType, handleKey] = handle.link;
            if (scopeType === 'global') {
              const apis: FetchApiItem[] = props.actions[actionType].apis;
              // const { data, options } = apis.find((item) => item.key == handleKey)!;
              const { options, data: bindData } = apis.find((item) => item.key == handleKey)!;
              // const pramsObj = {};
              try {
                await request({
                  ...options,
                  headers: {
                    'Content-Type': ContentTypeEnum[options.contentType],
                  },
                  data: handleData(bindData, 'bind'),
                });
              } finally {
                $bus.emit(`data-changed`, {
                  id: props.element._vid,
                });
                console.log('');
              }
              // 通知相关的数据依赖
            } else if (scopeType === 'component') {
              // TODO 监听组件事件
              $bus.on(`${props.element._vid}:${handleKey}`, () => {
                // 执行某个函数
                interpreter.evaluate(``);
              });
            }
          }
        };
        return prev;
      }, {});

      onMounted(() => {
        const animations = props.element.animations;
        if (animations?.length) {
          let animateEl =
            (window.$$refs[props.element._vid]?.$el as HTMLElement) ??
            (window.$$refs[props.element._vid] as HTMLElement);

          animateEl = animateEl?.closest('.__slot-item')?.firstChild as HTMLElement;

          if (animateEl) {
            useAnimate(animateEl, animations);
          }
        }
      });

      return {
        events,
      };
    },
  });
</script>

<style scoped></style>
