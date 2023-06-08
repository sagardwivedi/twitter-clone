<template>
  <div>
    <TweetItemHeader :tweet="props.tweet" />
    <div class="ml-16">
      <p class="w-auto flex-shrink font-medium text-gray-800 dark:text-white">
        {{ props.tweet.text }}
      </p>
      <div
        v-for="image in tweet.mediaFile"
        :key="image.id"
        class="my-3 mr-2 flex rounded-2xl border-2"
      >
        <img
          :src="image.url"
          :alt="image.id"
          :class="twitterBorderColor"
          class="w-full rounded-2xl"
        />
      </div>
      <div class="mt-2">
        <TweetItemActions />
      </div>
    </div>
  </div>
</template>

<script setup>
const { twitterBorderColor } = useTailwindConfig();

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
});


</script>
