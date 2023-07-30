<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import vuedraggable from 'vuedraggable'
import { useUserStore } from '~/stores/user'
import { useToolbarStore } from '~/stores/toolbar'
import { isMobileDevice } from '~/utils'

const props = defineProps({
  id: {
    type: String,
    default: 'cv-preview',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
})

const user = useUserStore()
const { splitIndex, about, summary, experience, project, skill, education, certificate, contact, social } = storeToRefs(user)
const toolbar = useToolbarStore()
const { currentState, noteList } = storeToRefs(toolbar)
const newNoteId = ref(0)
const isNoteEditing = ref(false)

toolbar.$onAction(({ name, args }) => {
  if (name === 'addNote')
    newNoteId.value = args[0].id
})

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
    if (currentState.value.layout === 'layout-full')
      return [content.value[0], content.value.find(item => item.key === 'contact')]
    else
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
    if (currentState.value.layout === 'layout-full')
      return content.value.filter((item, index) => index !== 0 && item.key !== 'contact' && index <= splitIndex.value)
    else
      return content.value.filter((item, index) => index !== 0 && index <= splitIndex.value)
  },
  set(newValue) {
    user.updateSplitIndex(newValue.length)
    user.$patch((state) => {
      newValue.forEach((item, index) => {
        state[item.key].order = index + 2
      })
    })
  },
})
const rightList = computed({
  get() {
    if (currentState.value.layout === 'layout-full')
      return content.value.filter((item, index) => index !== 0 && item.key !== 'contact' && index > splitIndex.value)
    else
      return content.value.filter((item, index) => index !== 0 && index > splitIndex.value)
  },
  set(newValue) {
    user.updateSplitIndex(content.value.length - newValue.length - 1)
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
</script>

<template>
  <div v-if="!readOnly">
    <Note
      v-for="note in noteList"
      :key="note.id"
      v-model:is-note-editing="isNoteEditing"
      :note="note"
      :is-open="newNoteId === note.id"
    />
  </div>
  <div class="heading-default title-default subtitle-default paragraph-default heading-large title-large subtitle-large paragraph-large" />
  <div
    :id="id"
    class="w-full h-full bg-white flex-shrink-0 p-6 shadow-custom cv-preview"
    style="min-height: inherit;"
  >
    <div
      class="w-full h-full"
      :class="currentState.fontFamily"
      style=""
    >
      <div
        :class="{
          'w-full flex justify-between': currentState.layout === 'layout-full',
          'w-3/4 ml-auto': currentState.layout === 'layout-left',
          'w-3/4 mr-auto': currentState.layout === 'layout-right',
        }"
      >
        <CVPreviewSection
          v-for="item in topList"
          :key="item.key"
          :element="item"
          :read-only="readOnly"
        />
      </div>
      <div class="flex flex-wrap gap-y-3">
        <div
          :class="{
            'w-full': currentState.layout === 'layout-full',
            'w-3/4 order-2': currentState.layout === 'layout-left',
            'w-3/4 order-1': currentState.layout === 'layout-right',
          }"
        >
          <vuedraggable
            v-if="!readOnly"
            v-model="leftList"
            group="section"
            item-key="key"
            class="h-full flex flex-col gap-3"
            delay-on-touch-only
            :delay="isMobileDevice() ? 250 : 0"
          >
            <template #item="{element}">
              <CVPreviewSection :element="element" />
            </template>
          </vuedraggable>

          <div
            v-for="(element, index) in leftList"
            v-else
            :key="index"
          >
            <CVPreviewSection :element="element" :read-only="readOnly" />
          </div>
        </div>
        <!-- add padding between left part and right part -->
        <div
          :class="{
            'w-full': currentState.layout === 'layout-full',
            'w-1/4 order-1 pr-4': currentState.layout === 'layout-left',
            'w-1/4 order-2 pl-4': currentState.layout === 'layout-right',
          }"
        >
          <vuedraggable
            v-if="!readOnly"
            v-model="rightList"
            group="section"
            item-key="key"
            class="h-full flex flex-col gap-3"
            delay-on-touch-only
            :delay="isMobileDevice() ? 250 : 0"
          >
            <template #item="{element}">
              <CVPreviewSection :element="element" />
            </template>
          </vuedraggable>

          <div
            v-for="(element, index) in rightList"
            v-else
            :key="index"
          >
            <CVPreviewSection :element="element" :read-only="readOnly" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cv-preview ol {
  @apply pl-4;
  list-style: none;
  counter-reset: li;
}
.cv-preview ol li {
  counter-increment: li;
}
.cv-preview ol li::before {
  content: counter(li) '. ';
  display: inline-block;
  width: 1rem;
  margin-left: -1rem;
}

.cv-preview ul {
  @apply pl-4;
  list-style: none;
}
.cv-preview ul li::before {
  content: '•';
  display: inline-block;
  width: 1rem;
  margin-left: -1rem;
}

.cv-preview .ql-indent-1 {
  @apply pl-4;
}
.cv-preview .ql-indent-2 {
  @apply pl-8;
}
.cv-preview .ql-indent-3 {
  @apply pl-12;
}
.cv-preview .ql-indent-4 {
  @apply pl-16;
}
.cv-preview .ql-indent-5 {
  @apply pl-20;
}
.cv-preview .ql-indent-6 {
  @apply pl-24;
}
.cv-preview .ql-indent-7 {
  @apply pl-28;
}
.cv-preview .ql-indent-8 {
  @apply pl-32;
}
.cv-preview .ql-indent-9 {
  @apply pl-36;
}
.cv-preview .ql-indent-10 {
  @apply pl-40;
}

.cv-preview a {
  text-decoration: underline;
}

.cv-preview [data-draggable="true"] {
  @apply relative cursor-move bg-white rounded-xl;
}
.cv-preview [data-draggable="true"]::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-20px);
  background-image: url('../assets/icons/drag-indicator.svg');
  width: 20px;
  height: 20px;
  opacity: 0;
}
.cv-preview [data-draggable="true"]:hover {
  @apply bg-primary-10;
}
.cv-preview [data-draggable="true"]:hover::before {
  opacity: 1;
}
.cv-preview [draggable="true"] {
  @apply bg-primary-10;
}
.sortable-chosen.sortable-ghost {
  @apply h-1 bg-primary-10 my-1;
}
.cv-preview.adding-note-mode {
  cursor: url('../assets/icons/note.svg'), auto;
}
</style>
