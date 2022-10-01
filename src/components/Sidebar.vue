<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { useUserStore } from '~/stores/user'
import { MIN_SIDEBAR_WIDTH } from '~/constants'
import { isMobileDevice } from '~/utils'

const user = useUserStore()
const { about, summary, experience, project, skill, education, certificate, contact, social, timestamp } = storeToRefs(user)

const router = useRouter()
const sidebarMenus = [
  {
    name: 'About',
    path: '/edit/about',
    icon: 'i-custom:about',
  },
  {
    name: 'Contact',
    path: '/edit/contact',
    // TODO: icon should use i-custom
    icon: 'i-origin:contact',
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
    name: 'Social',
    path: '/edit/social',
    icon: 'i-custom:social',
  },
]
const menus = computed({
  get() {
    const content = [
      // { key: 'about', ...about.value },
      { key: 'summary', ...summary.value },
      { key: 'experience', ...experience.value },
      { key: 'project', ...project.value },
      { key: 'skill', ...skill.value },
      { key: 'education', ...education.value },
      { key: 'certificate', ...certificate.value },
      { key: 'contact', ...contact.value },
      { key: 'social', ...social.value },
    ].sort((a, b) => a.order - b.order)
    return content.map(item => sidebarMenus.find(menu => menu.name.toLowerCase() === item.key))
  },
  set(newMenus) {
    user.$patch((state) => {
      newMenus.forEach((item, index) => {
        if (item)
          state[item.name.toLowerCase()].order = index + 2 // order starts from 1 and skip the first one
      })
    })
  },
})
const sidebar = ref<any>(null)
const isOpen = ref(false)
const isSmallSidebar = ref(true)
const drag = ref(true)

const menuOpenWidth = computed(() => {
  return isOpen.value && !isSmallSidebar.value ? 218 : 64
})

onMounted(() => {
  if (sidebar.value) {
    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(sidebar.value)
  }
})

function resize() {
  if (sidebar.value.offsetWidth < (MIN_SIDEBAR_WIDTH + 218)) {
    if (!isSmallSidebar.value)
      isOpen.value = false

    isSmallSidebar.value = true
  }
  else {
    if (isOpen.value)
      isOpen.value = false

    isSmallSidebar.value = false
  }
}

function toggleSidebar() {
  isOpen.value = !isOpen.value
}

function isActivePath(targetPath: string) {
  return router.currentRoute.value.path.indexOf(targetPath) === 0
}

function onMenuClick(path) {
  if (isSmallSidebar.value)
    isOpen.value = false

  router.push(path)
}
</script>

<template>
  <div ref="sidebar" class="sidebar w-full h-full bg-white relative flex">
    <div
      class="h-full py-5 bg-white absolute top-0 left-0 z-1 sm:overflow-y-auto transition-all duration-100 flex flex-col gap-4"
      :class="isOpen ? 'sm:w-[218px] px-5' : 'sm:w-[64px] px-1'"
    >
      <button
        :class="isOpen ? 'self-end' : 'self-center'"
        :title="isOpen ? 'Hide Sidebar' : 'Open Sidebar'"
        @click="toggleSidebar"
      >
        <span v-if="isOpen" class="i-custom:expand w-6 h-6 text-blacks-40" />
        <span v-else class="i-custom:collapse w-6 h-6 text-blacks-40" />
      </button>

      <div class="flex flex-col gap-4 overflow-y-auto disable-scrollbar">
        <SidebarMenu
          v-for="element in sidebarMenus.filter((menu, index) => index === 0)"
          :key="element.path"
          :path="element.path"
          :name="element.name"
          :icon="element.icon"
          :show-only-icon="!isOpen"
          :disabled="!user[element.name.toLocaleLowerCase()].isShow"
          :click="onMenuClick"
        />

        <draggable
          v-model="menus"
          item-key="path"
          tag="transition-group"
          delay-on-touch-only
          :delay="isMobileDevice() ? 200 : 0"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{element}">
            <SidebarMenu
              :path="element.path"
              :name="element.name"
              :icon="element.icon"
              :show-only-icon="!isOpen"
              :disabled="!user[element.name.toLocaleLowerCase()].isShow"
              :click="onMenuClick"
            />
          </template>
        </draggable>
      </div>
    </div>

    <div
      class="w-[calc(100%-64px)] h-full ml-[64px] bg-white flex flex-col gap-6 px-4"
      :class="!isActivePath('/edit/download') ? 'py-8' : 'py-4'"
      :style="`margin-left: ${menuOpenWidth}px`"
    >
      <router-view :key="timestamp" />
    </div>
  </div>
</template>

<style>
.sidebar .sortable-chosen.sortable-ghost {
  @apply h-1 bg-primary-10 rounded py-[2px];
}
.sidebar .sortable-chosen.sortable-ghost > * {
  @apply hidden;
}
</style>
