<script lang="ts" setup>
  import { type AlertVariants, alertVariants } from '.';
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/lib/utils';

  const props = defineProps<{
    class?: HTMLAttributes['class'];
    variant?: AlertVariants['variant'];
  }>();
</script>

<template>
  <div :class="cn(alertVariants({ variant }), props.class)" role="alert">
    <slot />
  </div>
</template>
