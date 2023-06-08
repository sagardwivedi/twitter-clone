<template>
  <div class="flex h-screen flex-col" :class="{ defaultTransition }">
    <div
      class="my-2 w-min rounded-full p-2 hover:bg-blue-50 dark:hover:bg-white/20"
    >
      <NuxtLink to="/">
        <div class="h-8 w-8">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>
    <div class="mt-2 space-y-3">
      <SidebarLeftTab active>
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <HashtagIcon />
        </template>
        <template v-slot:name> Explorer </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name> Notifications </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name> Messages </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name> Lists </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name> Bookmarks </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <EllipsisHorizontalCircleIcon />
        </template>
        <template v-slot:name> More </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg">
          <span class="font-bold"> Tweet </span>
        </UIButton>
      </div>
      <div class="block text-white xl:hidden">
        <UIButton>
          <div class="h-6 w-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon } from "@heroicons/vue/20/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";

const { defaultTransition } = useTailwindConfig();
</script>
