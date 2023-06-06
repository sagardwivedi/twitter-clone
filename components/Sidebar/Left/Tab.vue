<template>
  <NuxtLink
    to="#"
    class="flex w-min items-center rounded-full p-3 hover:bg-gray-200 dark:text-white text-black dark:hover:bg-dim-200"
    :class="defaultTransition"
  >
    <div class="h-6 w-6">
      <slot name="icon"></slot>
    </div>
    <div class="ml-4 text-xl hidden xl:block" :class="textClasses">
      <slot name="name"></slot>
    </div>
  </NuxtLink>
</template>
<script setup>
const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal"
);
</script>
