<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    title?: string
    open?: boolean
    height?: string
  }>(),
  {
    open: true,
    height: '400px',
  },
)

const page = ref<HTMLDivElement | null>(null)

const { toggle } = useFullscreen(page)

function openInBlank() {
  window.open(props.src, '_blank')
}
</script>

<template>
  <div class="custom-block details">
    <details :open>
      <summary class="flex items-center">
        <div class="open i-carbon:triangle-right-solid mr-1 text-[8px]" />
        <div class="close i-carbon:triangle-down-solid mr-1 text-[8px]" />
        <div class="title inline-block flex-1">
          {{ title }}
        </div>
        <div class="i-carbon:fit-to-screen px-4 hover:scale-120" @click.prevent="toggle" />
        <div class="i-carbon:screen-map-set hover:scale-120" @click.prevent="openInBlank" />
      </summary>

      <div ref="page">
        <iframe :src="src" width="100%" :height class="border-none" />
      </div>
    </details>
  </div>
</template>

<style scoped>
details[open] .open,
details:not([open]) .close {
  display: none;
}

details:not([open]) .open,
details[open] .close {
  display: inline-block;
}

.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
}
</style>
