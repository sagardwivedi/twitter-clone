<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput :user="props.user" @on-submit="handleFormSubmit" />
    </div>
  </div>
</template>

<script setup>
const { postTweet } = useTweets();

const loading = ref(false);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

async function handleFormSubmit(data) {
  loading.value = true;
  try {
    await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    });
  } catch (error) {
  } finally {
    loading.value = false;
  }
}
</script>
