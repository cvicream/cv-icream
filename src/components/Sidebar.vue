<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { useUserStore } from '~/stores/user'
import { MIN_SIDEBAR_WIDTH } from '~/constants'

const user = useUserStore()
const { timestamp } = storeToRefs(user)

const router = useRouter()
const sidebarMenus = ref([
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
])
const sidebar = ref<any>(null)
const isOpen = ref(false)
const isSmallSidebar = ref(true)
const drag = ref(true)

const menuOpenWidth = computed(() => {
  return isOpen.value && !isSmallSidebar.value ? 218 : 64
})

watch(sidebarMenus, (newMenus) => {
  user.$patch((state) => {
    const result = {}
    newMenus.forEach((menu) => {
      result[menu.name.toLocaleLowerCase()] = menu
    })
    Object.keys(state).forEach((key) => {
      const index = newMenus.findIndex(menu => menu.name.toLocaleLowerCase() === key.toLocaleLowerCase())
      if (index >= 0)
        state[key].order = index + 1
    })
    return result
  })
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

function onMenuClick() {
  if (isSmallSidebar.value)
    isOpen.value = false
}
</script>

<template>
  <div ref="sidebar" class="w-full h-full bg-white relative flex">
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
        <draggable
          v-model="sidebarMenus"
          item-key="path"
          tag="transition-group"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{element}">
            <router-link
              :key="element.path"
              :to="element.path"
              :class="isActivePath(element.path) && 'bg-primary-10 rounded'"
              @click="onMenuClick"
            >
              <span
                class="w-8 h-8"
                :class="
                  user[element.name.toLocaleLowerCase()].isShow
                    ? `${element.icon} text-blacks-70` : `${element.icon} text-blacks-40`"
              />
              <span
                class="leading ml-4"
                :class="{
                  'hidden': !isOpen,
                  'text-blacks-70': user[element.name.toLocaleLowerCase()].isShow,
                  'text-blacks-40': !user[element.name.toLocaleLowerCase()].isShow
                }"
              >
                {{ element.name }}
              </span>
            </router-link>
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

<style scoped>
a {
  @apply flex items-center px-3 py-2 hover:bg-primary-10 hover:rounded
}
</style>
