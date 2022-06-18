<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const user = useUserStore()

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
  <div class="w-full h-full absolute z-1 bg-white flex sm:w-[390px] sm:top-0 sm:right-0 sm:bottom-0">
    <div class="sm:border-l border-blacks-20" />
    <div
      class="py-5 bg-white sm:h-full sm:overflow-y-auto sm:absolute sm:top-0 sm:right-[326px] z-1 transition-all duration-100 sm:border-l border-blacks-20 flex flex-col gap-4"
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

      <div class="flex flex-col gap-4 overflow-y-auto disable-scrollbar">
        <router-link
          v-for="menu in sidebarMenus"
          :key="menu.path"
          :to="menu.path"
          :class="isActivePath(menu.path) && 'bg-primary-10 rounded'"
        >
          <span
            class="w-8 h-8"
            :class="
              user[menu.name.toLocaleLowerCase()].isShow
                ? `${menu.icon} text-blacks-70` : `${menu.icon} text-blacks-40`"
          />
          <span
            class="leading ml-4"
            :class="{
              'hidden': !isOpen,
              'text-blacks-70': user[menu.name.toLocaleLowerCase()].isShow,
              'text-blacks-40': !user[menu.name.toLocaleLowerCase()].isShow
            }"
          >
            {{ menu.name }}
          </span>
        </router-link>
      </div>
    </div>
    <div
      class="w-[calc(100%-64px)] h-full bg-white sm:w-[326px] absolute top-0 right-0 flex flex-col gap-6 px-4"
      :class="!isActivePath('/edit/download') ? 'py-8' : 'py-4'"
    >
      <router-view />
    </div>
  </div>
</template>

<style scoped>
a {
  @apply flex items-center px-3 py-2 hover:bg-primary-10 hover:rounded
}
</style>