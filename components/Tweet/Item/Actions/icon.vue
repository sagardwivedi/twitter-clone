<template>
  <div class="group flex cursor-pointer items-center text-gray-400">
    <div
      :class="`rounded-full p-2 group-hover:bg-${props.color}-100   group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`"
    >
      <slot name="icon" classes="w-5 h-5 group-hover:fill-current" />
    </div>
    <span :class="`group-hover:text-${props.color}-400`">
      <slot name="text" />
    </span>
  </div>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>
