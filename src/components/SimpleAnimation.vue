<template>
  <Transition
    mode="out-in"
    :enter-active-class="activeClass[0]"
    :leave-active-class="activeClass[1]"
    :duration="duration"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface SimpleAnimationProps {
  animate?: string;
  animateIn?: string;
  animateOut?: string;
  mode?: string | 'in-out' | 'in' | 'out';
  duration?: number;
};
const props = withDefaults(defineProps<SimpleAnimationProps>(), {
  animate: '',
  mode: 'in-out',
});

const activeClass = computed(() => {
  switch (true) {
    case !!props.animateIn || !!props.animateOut:
      return [props.animateIn ? `animate__animated animate__${props.animateIn}` : '', props.animateOut ? `animate__animated animate__${props.animateOut}` : ''];
    case props.mode === 'in-out': 
      {
        if(props.animate.search(/In|Out/) > -1) {
          return [`animate__animated animate__${props.animate.replace(/In|Out/, 'In')}`, `animate__animated animate__${props.animate.replace(/In|Out/, 'Out')}`];
        }
        return [`animate__animated animate__${props.animate}In`, `animate__animated animate__${props.animate}Out`];
      }
    case props.mode === 'in':
      return [`animate__animated animate__${props.animate.replace(/In|Out/, 'In')}`, ];
    case props.mode === 'out':
      return ['' ,`animate__animated animate__${props.animate.replace(/In|Out/, 'Out')}`];
    default:
      return [];
  }
});

</script>

<style>
.during-animation {
  position: absolute;
}
</style>