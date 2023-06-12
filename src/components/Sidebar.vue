<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import vuedraggable from 'vuedraggable'
import { useUserStore } from '~/stores/user'
import { isMobileDevice } from '~/utils'

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  setOpen: {
    type: Function,
    default: () => {},
  },
  toggle: {
    type: Function,
    default: () => {},
  },
})

const user = useUserStore()
const { about, summary, experience, project, skill, education, certificate, contact, social, timestamp } = storeToRefs(user)

const router = useRouter()

const sidebarMenus = computed(() => {
  return [
    {
      id: 'about',
      name: 'About',
      path: '/edit/about',
      icon: 'i-origin:about',
      order: 0, // set to 0 if draggable is false
      draggable: false,
      ...getObjectProperties(about.value),
    },
    {
      id: 'contact',
      name: 'Contact',
      path: '/edit/contact',
      icon: 'i-origin:contact',
      order: 1,
      draggable: props.draggable,
      ...getObjectProperties(contact.value),
    },
    {
      id: 'summary',
      name: 'Summary',
      path: '/edit/summary',
      icon: 'i-origin:summary',
      order: 2,
      draggable: props.draggable,
      ...getObjectProperties(summary.value),
    },
    {
      id: 'experience',
      name: 'Experience',
      path: '/edit/experience',
      icon: 'i-origin:experience',
      order: 3,
      draggable: props.draggable,
      ...getObjectProperties(experience.value),
    },
    {
      id: 'project',
      name: 'Project',
      path: '/edit/project',
      icon: 'i-origin:project',
      order: 4,
      draggable: props.draggable,
      ...getObjectProperties(project.value),
    },
    {
      id: 'skill',
      name: 'Skill',
      path: '/edit/skill',
      icon: 'i-origin:skill',
      order: 5,
      draggable: props.draggable,
      ...getObjectProperties(skill.value),
    },
    {
      id: 'education',
      name: 'Education',
      path: '/edit/education',
      icon: 'i-origin:education',
      order: 6,
      draggable: props.draggable,
      ...getObjectProperties(education.value),
    },
    {
      id: 'certificate',
      name: 'Certificate',
      path: '/edit/certificate',
      icon: 'i-origin:certificate',
      order: 7,
      draggable: props.draggable,
      ...getObjectProperties(certificate.value),
    },
    {
      id: 'social',
      name: 'Social Media',
      path: '/edit/social',
      icon: 'i-origin:social',
      order: 8,
      draggable: props.draggable,
      ...getObjectProperties(social.value),
    },
  ].sort((a, b) => a.order - b.order)
})

const draggableMenus = computed({
  get() {
    return sidebarMenus.value.filter(item => item.draggable)
  },
  set(newMenus) {
    user.$patch((state) => {
      newMenus.forEach((item, index) => {
        if (item && item.draggable)
          state[item.id].order = index + 1 // order starts from 1
      })
    })
  },
})

const sidebar = ref<any>(null)
const drag = ref(true)
const expandTooltip = ref(false)

const menuOpenWidth = computed(() => {
  return props.isOpen && !props.isMobile ? 236 : 64
})

onMounted(() => {
  if (sidebar.value) {
    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(sidebar.value)
  }
})

function getObjectProperties(obj) {
  const result = {}
  const keys = ['order', 'isShow']
  keys.forEach((key) => {
    if (key in obj) result[key] = obj[key]
  })
  return result
}

function resize() {
  if (props.isMobile)
    props.setOpen(false)
}

function toggleSidebar() {
  const value = !props.isOpen
  props.setOpen(value)

  if (!props.isMobile)
    props.toggle(value)
}

function isActivePath(targetPath: string) {
  return router.currentRoute.value.path.indexOf(targetPath) === 0
}

function onMenuClick(id, path) {
  if (props.isMobile) props.setOpen(false)

  user.$patch((state) => {
    state[id].isEditing = true
    document.querySelector(`#cv-preview #${id}`)?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      state[id].isEditing = false
    }, 1000)
  })
  router.push(path)
}
</script>

<template>
  <div ref="sidebar" class="sidebar w-full h-full bg-white relative flex">
    <div v-if="expandTooltip" class="absolute top-[34px]">
      <Tooltip
        :placement="isOpen ?'left': 'right'"
        :text="isOpen ? 'Hide Sidebar' : 'Open Sidebar'"
        :class="isOpen ? 'left-48':'left-13' "
        style="display:block;"
      />
    </div>
    <div
      class="h-full pt-5 bg-white absolute top-0 left-0 z-1 sm:overflow-y-auto transition-all duration-200 flex flex-col gap-4"
      :class="isOpen ? 'sm:w-[236px] px-5' : 'sm:w-[64px] px-1'"
    >
      <button
        :class="isOpen ? 'self-end' : 'self-center'"
        @click="toggleSidebar(); expandTooltip = false"
        @mouseover="expandTooltip = true"
        @mouseout="expandTooltip = false"
      >
        <span
          v-if="isOpen"
          class="w-6 h-6 text-blacks-40"
          :class="isMobile ? 'i-origin:expand' : 'i-origin:collapse'"
        />
        <span
          v-else
          class="w-6 h-6 text-blacks-40"
          :class="isMobile ? 'i-origin:collapse' : 'i-origin:expand'"
        />
      </button>

      <div class="flex flex-col gap-4 overflow-y-auto disable-scrollbar last-child-pb-4">
        <SidebarMenu
          v-for="element in sidebarMenus.filter(item => !item.draggable)"
          :id="element.id"
          :key="element.path"
          :path="element.path"
          :name="element.name"
          :icon="element.icon"
          :show-only-icon="!isOpen"
          :disabled="!user[element.id]?.isShow"
          :click="onMenuClick"
        />

        <vuedraggable
          v-model="draggableMenus"
          item-key="path"
          tag="transition-group"
          delay-on-touch-only
          :delay="isMobileDevice() ? 250 : 0"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{element}">
            <SidebarMenu
              :id="element.id"
              :path="element.path"
              :name="element.name"
              :icon="element.icon"
              :show-only-icon="!isOpen"
              :disabled="!user[element.id]?.isShow"
              :click="onMenuClick"
            />
          </template>
        </vuedraggable>
      </div>
    </div>

    <div
      class="h-full bg-white flex flex-col gap-6 px-4 transition-all duration-200"
      :class="[
        !isActivePath('/edit/download') ? 'pt-8' : 'pt-4',
        isOpen ? 'w-[calc(100%-236px)]' : 'w-[calc(100%-64px)]'
      ]"
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
