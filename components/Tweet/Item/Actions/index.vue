<template>
  <div>
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <ChatBubbleBottomCenterIcon :class="classes" />
      </template>
    </TweetItemActionsIcon>
  </div>
</template>

<script setup>
import { ChatBubbleBottomCenterIcon } from "@heroicons/vue/24/outline";
</script>
