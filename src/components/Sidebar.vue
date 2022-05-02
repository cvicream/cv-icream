<script setup lang="ts">
const router = useRouter()
const sidebarMenus = ref([
  {
    name: 'About',
    path: '/edit/about',
    icon: 'i-custom:about',
  },
  {
    name: 'Summary',
    path: '/edit/summary',
    icon: 'i-custom:summary',
  },
  {
    name: 'Experience',
    path: '/edit/experience',
    icon: 'i-custom:experience',
  },
  {
    name: 'Project',
    path: '/edit/project',
    icon: 'i-custom:project',
  },
  {
    name: 'Skill',
    path: '/edit/skill',
    icon: 'i-custom:skill',
  },
  {
    name: 'Education',
    path: '/edit/education',
    icon: 'i-custom:education',
  },
  {
    name: 'Certificate',
    path: '/edit/certificate',
    icon: 'i-custom:certificate',
  },
  {
    name: 'Contact',
    path: '/edit/contact',
    icon: 'i-custom:contact',
  },
])
const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
const isActivePath = (targetPath: string) => {
  return router.currentRoute.value.path.indexOf(targetPath) === 0
}
</script>

<template>
  <div class="flex relative sm:static">
    <div
      class="py-5 bg-white sm:h-full sm:absolute sm:top-0 sm:right-[326px] z-1 transition-all duration-100 sm:border-l border-blacks-20 flex flex-col gap-2"
      :class="isOpen ? 'sm:w-[218px] px-5' : 'sm:w-[64px] px-1'"
    >
      <button
        :class="isOpen ? 'self-end' : 'self-center'"
        :title="isOpen ? 'Hide Sidebar' : 'Open Sidebar'"
        @click="toggleSidebar"
      >
        <span v-if="isOpen" class="i-custom:expand sm:i-custom:collapse w-6 h-6 text-blacks-40" />
        <span v-else class="i-custom:collapse sm:i-custom:expand w-6 h-6 text-blacks-40" />
      </button>

      <router-link
        v-for="menu in sidebarMenus"
        :key="menu.path"
        :to="menu.path"
        :class="isActivePath(menu.path) && 'bg-primary-10 rounded'"
      >
        <span class="w-8 h-8 text-blacks-70" :class="menu.icon " />
        <span :class="!isOpen && 'hidden'">{{ menu.name }}</span>
      </router-link>
    </div>
    <div class="w-[calc(100%-64px)] sm:w-[326px] sm:h-full absolute top-0 right-0 flex flex-col gap-6 px-4 py-8">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
a {
  @apply flex items-center px-3 py-2 hover:bg-primary-10 hover:rounded
}
a > span:last-child {
  @apply font-normal text-xl text-blacks-100 leading-6 ml-4
}
</style>
