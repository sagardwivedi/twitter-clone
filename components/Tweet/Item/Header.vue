<template>
  <div class="flex p-3">
    <div>
      <img :src="author.profileImage" alt="" class="h-10 w-10 rounded-full" />
    </div>
    <div class="ml-3">
      <span class="font-mono text-gray-800 dark:text-white">{{
        author.name
      }}</span>
      <span class="ml-2 text-sm font-medium text-gray-400">
        <NuxtLink to="#">
          {{ author.handle }}
        </NuxtLink>
        . {{ props.tweet.postedAtHuman }} ago
      </span>

      <p v-if="props.tweet.replyTo" class="text-sm">
        <span class="text-gray-500"> Replying to </span>
        <NuxtLink :to="replyToTweetUrl" class="text-blue-400">
          {{ props.tweet.replyTo.author.handle }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
});

const author = props.tweet.author;
const replyToTweetUrl = computed(() => `/status/${props.tweet.replyTo.id}`);
</script>
