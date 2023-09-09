<script setup lang="ts">

import { vOnClickOutside } from '@vueuse/components'
import { useToolbarStore } from '~/stores/toolbar'
import type { Note } from '~/types'

const emit = defineEmits(['update:isNoteEditing'])

const props = defineProps<{
  note: Note
  isOpen: boolean
  isNoteEditing: boolean
}>()

const toolbar = useToolbarStore()
const show = ref(props.isOpen)
const value = ref(props.note.value)
const editorRef = ref(null)

watch(() => value.value !== props.note.value, (isEditing) => {
  emit('update:isNoteEditing', isEditing)
})

watch(() => Boolean(editorRef.value), (hasEditor) => {
  if (hasEditor) {
    const quill = editorRef.value?.getQuill()
    quill.focus()
  }
})

const onToggleNote = () => {
  if (value.value !== props.note.value) {
    value.value = props.note.value
    show.value = false
    return
  }
  if (!props.isNoteEditing)
    show.value = !show.value
}

const onSave = () => {
  toolbar.modifyNote({
    ...props.note,
    value: value.value,
  })
  show.value = false
}

const onRemove = () => {
  toolbar.removeNote(props.note.id)
}

const onClickOutside = () => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(value.value, 'text/html')
  if (!doc?.body?.firstChild?.textContent) {
    toolbar.removeNote(props.note.id)
  }
  else if (value.value === props.note.value) {
    show.value = false
  }
  else {
    const quill = editorRef.value?.getQuill()
    quill.focus()
  }
}

const onDragStart = (event: DragEvent) => {
  document.querySelectorAll('#cv-preview [data-draggable="true"]').forEach(el => el.classList.add('temp-static'))
  document.getElementById('cv-preview')?.addEventListener('dragover', (event) => {
    event.preventDefault()
  }, false)
  event.target?.classList.add('dragging')
}

const onDragEnd = (event: DragEvent) => {
  document.querySelectorAll('#cv-preview [data-draggable="true"]').forEach(el => el.classList.remove('temp-static'))
  event.target?.classList.remove('dragging')

  const boundingBox = document.getElementById('cv-preview')?.getBoundingClientRect()!
  const left = event.clientX - boundingBox.x
  const top = event.clientY - boundingBox.y
  if (left < 0 || top < 0 || left > boundingBox?.width || top > boundingBox?.height)
    return

  toolbar.modifyNote({
    ...props.note,
    location: {
      left,
      top,
    },
  })
}

const onTouchEnd = (event: TouchEvent) => {
  const touch = event.touches[0] || event.changedTouches[0]
  document.querySelectorAll('#cv-preview [data-draggable="true"]').forEach(el => el.classList.remove('temp-static'))

  const boundingBox = document.getElementById('cv-preview')?.getBoundingClientRect()!
  const left = touch.pageX - boundingBox.x
  const top = touch.pageY - boundingBox.y

  if (left < 0
  || top < 0
  || left > boundingBox?.width
  || top > boundingBox?.height
  )
    return

  toolbar.modifyNote({
    ...props.note,
    location: {
      left,
      top,
    },
  })
}

</script>

<template>
  <div
    v-on-click-outside="onClickOutside"
    class="note-container"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @touchend="onTouchEnd"
  >
    <button
      class="note-icon bg-yellow"
      @click="onToggleNote"
    >
      <span
        class="i-custom:note w-8 h-8"
      />
    </button>
    <div v-if="show" class="note bg-yellow">
      <div class="flex justify-between items-center mb-1">
        <span class="text-blacks-70">Note</span>
        <div class="flex gap-3">
          <button v-if="value" class="i-custom:delete icon-24 cursor-pointer" @click="onRemove" />
          <div v-if="value !== props.note.value" class="cursor-pointer" @click="onSave">
            <span class="checkmark " />
          </div>
          <button v-else class="i-custom:cancel icon-24 cursor-pointer" @click="onToggleNote" />
        </div>
      </div>
      <Editor v-model="value" v-model:editor-ref="editorRef" class="h-[130px]" placeholder="Note down here..." />
    </div>
  </div>
</template>

<style scoped>
.note-icon {
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  top: calc(v-bind('props.note.location.top') * 1px);
  left: calc(v-bind('props.note.location.left') * 1px);
}
.note {
  width: 300px;
  height: 200px;
  position: absolute;
  border-radius: 12px;
  padding: 16px;
  z-index: 2;
  top: calc(v-bind('props.note.location.top') * 1px);
  left: calc((v-bind('props.note.location.left') + 40) * 1px);
}
.checkmark {
  display: inline-block;
  transform: rotate(45deg);
  height: 12px;
  width: 7px;
  border-bottom: 2px solid #72B255;
  border-right: 2px solid #72B255;
  margin: 4px 10px 0 7px;
}
.dragging {
  opacity: 0.1;
}
</style>
