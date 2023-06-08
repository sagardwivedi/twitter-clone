<template>
  <div>
    <div v-if="isEmptyArray">
      <p class="text-center text-gray-500 p-4">No tweets 🥲 </p>
    </div>
    <div
      class="cursor-pointer border-b pb-4 hover:bg-gray-100 dark:hover:bg-dim-300"
      v-else
      v-for="tweet in props.tweets"
      :class="[twitterBorderColor, defaultTransition]"
      :key="tweet.id"
    >
      <TweetItem :tweet="tweet" />
    </div>
  </div>
</template>

<script setup>
const { twitterBorderColor, defaultTransition } = useTailwindConfig();
const props = defineProps({
  tweets: {
    type: Array,
    required: true,
  },
});

const isEmptyArray = computed(() => props.tweets.length === 0);
</script>
