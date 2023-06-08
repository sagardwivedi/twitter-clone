<template>
  <div class="group flex cursor-pointer items-center text-gray-400">
    <div
      :class="`rounded-full p-2 group-hover:bg-blue-100 group-hover:text-blue-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`"
    >
      <ChatBubbleOvalLeftIcon class="h-5 w-5" />
    </div>
    <span class="group-hover:text-blue-400">5</span>
    {{ props.color }}
  </div>
</template>

<script setup>
import { ChatBubbleOvalLeftIcon } from "@heroicons/vue/24/solid";

const { defaultTransition } = useTailwindConfig();

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>
