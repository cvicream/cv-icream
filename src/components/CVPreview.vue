<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'

const props = defineProps<{
  id: string
}>()

const id = ref(props.id || 'cv-preview')

const user = useUserStore()
const { about, summary, experience, project, skill, education, certificate, contact, social } = storeToRefs(user)

const content = computed(() => {
  return [
    { key: 'about', ...about.value },
    { key: 'summary', ...summary.value },
    { key: 'experience', ...experience.value },
    { key: 'project', ...project.value },
    { key: 'skill', ...skill.value },
    { key: 'education', ...education.value },
    { key: 'certificate', ...certificate.value },
    { key: 'contact', ...contact.value },
    { key: 'social', ...social.value },
  ].filter(item => item.isShow).sort((a, b) => a.order - b.order)
})

const topList = computed({
  get() {
    return [content.value[0]]
  },
  set(newValue) {
    user.$patch((state) => {
      newValue.forEach((item, index) => {
        state[item.key].order = index + 1 // order starts from 1
      })
    })
  },
})
const leftList = computed({
  get() {
    return content.value.filter((item, index) => index !== 0 && index <= (content.value.length / 2))
  },
  set(newValue) {
    user.$patch((state) => {
      newValue.forEach((item, index) => {
        state[item.key].order = index + 2
      })
    })
  },
})
const rightList = computed({
  get() {
    return content.value.filter((item, index) => index !== 0 && index > (content.value.length / 2))
  },
  set(newValue) {
    user.$patch((state) => {
      let total = content.value.length
      for (let i = newValue.length - 1; i >= 0; i--) {
        const item = newValue[i]
        state[item.key].order = total // count from the end
        total--
      }
    })
  },
})

const toolbar = useToolbarStore()
const { currentState } = storeToRefs(toolbar)
</script>

<template>
  <div class="title-default subtitle-default paragraph-default title-large subtitle-large paragraph-large" />
  <div
    :id="id"
    class="w-full h-full bg-white flex-shrink-0 p-6 shadow-custom cv-preview"
  >
    <div
      class="w-full h-full"
      :class="currentState.fontFamily"
      style=""
    >
      <div
        :class="{
          'w-full': currentState.layout === 'layout-full',
          'w-3/4 ml-auto': currentState.layout === 'layout-left',
          'w-3/4 mr-auto': currentState.layout === 'layout-right',
        }"
      >
        <draggable
          v-model="topList"
          group="section"
          item-key="key"
        >
          <template #item="{element}">
            <CVPreviewSection :element="element" />
          </template>
        </draggable>
      </div>
      <div class="flex flex-wrap">
        <div
          :class="{
            'w-full': currentState.layout === 'layout-full',
            'w-3/4 order-2': currentState.layout === 'layout-left',
            'w-3/4 order-1': currentState.layout === 'layout-right',
          }"
        >
          <draggable
            v-model="leftList"
            group="section"
            item-key="key"
          >
            <template #item="{element}">
              <CVPreviewSection :element="element" />
            </template>
          </draggable>
        </div>
        <div
          :class="{
            'w-full': currentState.layout === 'layout-full',
            'w-1/4 order-1': currentState.layout === 'layout-left',
            'w-1/4 order-2': currentState.layout === 'layout-right',
          }"
        >
          <draggable
            v-model="rightList"
            group="section"
            item-key="key"
          >
            <template #item="{element}">
              <CVPreviewSection :element="element" />
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cv-preview ol {
  @apply pl-3;
  list-style: none;
  counter-reset: li;
}
.cv-preview ol li {
  counter-increment: li;
}
.cv-preview ol li::before {
  content: counter(li) '. ';
  display: inline-block;
  width: 0.75rem;
  margin-left: -0.75rem;
}

.cv-preview ul {
  @apply pl-3;
  list-style: none;
}
.cv-preview ul li::before {
  content: '•';
  display: inline-block;
  width: 0.75rem;
  margin-left: -0.75rem;
}

.cv-preview .ql-indent-1 {
  @apply pl-3;
}
.cv-preview .ql-indent-2 {
  @apply pl-6;
}
.cv-preview .ql-indent-3 {
  @apply pl-9;
}
.cv-preview .ql-indent-4 {
  @apply pl-12;
}
.cv-preview .ql-indent-5 {
  @apply pl-15;
}
.cv-preview .ql-indent-6 {
  @apply pl-18;
}
.cv-preview .ql-indent-7 {
  @apply pl-21;
}
.cv-preview .ql-indent-8 {
  @apply pl-24;
}
.cv-preview .ql-indent-9 {
  @apply pl-27;
}
.cv-preview .ql-indent-10 {
  @apply pl-30;
}

.cv-preview a {
  text-decoration: underline;
}

.cv-preview [data-draggable="true"] {
  @apply cursor-move border border-transparent rounded-xl;
}
.cv-preview [data-draggable="true"]:hover {
  @apply border-primary-100;
}
.cv-preview [draggable="true"] {
  @apply cursor-grabbing border border-primary-100;
}
</style>
