<template>
  <div>
    <svg aria-hidden="true" :class="`svg-icon`" :style="{width, height}">
      <use :xlink:href="`/mock-web/svgIcons.svg#${iconName}`" :fill="color" />
    </svg>
  </div>
</template>
<script setup lang="ts">

interface SvgIconProps {
  iconName: string;
  color?: string;
  width?: string;
  height?: string;
}

withDefaults(defineProps<SvgIconProps>(), {
  color: 'inherit',
  width: '',
  height: '',
});
</script>
<style scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  overflow: hidden;
  fill: currentColor;
}
</style>