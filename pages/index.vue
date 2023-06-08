<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Home | Twitter</Title>
      </Head>
      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" />
      </div>
      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script setup>
const { useAuthUser } = useAuth();
const { twitterBorderColor } = useTailwindConfig();
const { getTweets } = useTweets();

const loading = ref(false);
const homeTweets = ref([]);

const user = useAuthUser();

onBeforeMount(async () => {
  loading.value = true;
  try {
    const { data } = await getTweets();
    homeTweets.value = data.value.tweets;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>
