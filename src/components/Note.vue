<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useToolbarStore } from '~/stores/toolbar'
import type { Note } from '~/types'

const emit = defineEmits(['update:isNoteEditing'])

const props = defineProps<{
  note: Note
  isOpen: boolean
  isNoteEditing: boolean
}>()

const toolbar = useToolbarStore()
const noteRef = ref(null)
const noteIconRef = ref<HTMLTextAreaElement | null>(null)
const editorRef = ref<HTMLTextAreaElement | null>(null)
const show = ref(props.isOpen)
const value = ref(props.note.value)
const isDragging = ref(false)
const left = ref(props.note.location.left)
const top = ref(props.note.location.top)
const shiftX = ref(0)
const shiftY = ref(0)
const hasTransition = ref(false)

const noteClasses = computed(() => {
  const classes: string[] = []

  if (props.note.location.left > 0.6)
    classes.push('note-left')
  else
    classes.push('note-right')

  if (props.note.location.top > 0.8)
    classes.push('note-bottom')
  else
    classes.push('note-top')

  return classes.join(' ')
})

watch(() => value.value !== props.note.value, (isEditing) => {
  emit('update:isNoteEditing', isEditing)
})

watch(() => props.isOpen, () => {
  show.value = props.isOpen
})

watch(() => props.note.location, () => {
  left.value = props.note.location.left
  top.value = props.note.location.top
})

watch(editorRef, () => {
  if (editorRef.value)
    (editorRef.value as HTMLTextAreaElement).focus()
})

watch(noteClasses, (newVal, oldVal) => {
  hasTransition.value = newVal !== oldVal
})

const onRemove = () => {
  toolbar.removeNote(props.note.id)
}

const onSave = () => {
  if (!value.value) {
    onRemove()
  }
  else {
    toolbar.modifyNote({
      ...props.note,
      value: value.value,
    })
  }

  show.value = false
}

const onToggleNote = () => {
  if (isDragging.value) {
    isDragging.value = false
    return
  }
  if (!value.value) {
    onRemove()
  }
  else if (value.value !== props.note.value) {
    value.value = props.note.value
    show.value = false
  }
  else if (!props.isNoteEditing) { show.value = !show.value }
}

onClickOutside(noteRef, (event) => {
  if (!value.value && !props.isNoteEditing) onRemove()
  else if (value.value === props.note.value) show.value = false
  else if (editorRef.value) (editorRef.value as HTMLTextAreaElement).focus()
})

const onDragStart = () => {
  document.querySelectorAll('#cv-preview [data-draggable="true"]').forEach(el => el.classList.add('temp-static'))
  document.getElementById('cv-preview')?.addEventListener('dragover', (event) => {
    event.preventDefault()
  }, false)
}

const onDragEnd = () => {
  document.querySelectorAll('#cv-preview [data-draggable="true"]').forEach(el => el.classList.remove('temp-static'))
}

// const onTouchEnd = (event: TouchEvent) => {
//   const touch = event.touches[0] || event.changedTouches[0]
//   document.querySelectorAll('#cv-preview [data-draggable="true"]').forEach(el => el.classList.remove('temp-static'))

//   const boundingBox = document.getElementById('cv-preview')?.getBoundingClientRect()!
//   const left = touch.pageX - boundingBox.x
//   const top = touch.pageY - boundingBox.y

//   if (left < 0
//   || top < 0
//   || left > boundingBox?.width
//   || top > boundingBox?.height
//   )
//     return

//   toolbar.modifyNote({
//     ...props.note,
//     location: {
//       left,
//       top,
//     },
//   })
// }

function onMouseDown(event: MouseEvent) {
  event.stopPropagation()
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)

  if (noteIconRef.value) {
    shiftX.value = event.clientX - noteIconRef.value.getBoundingClientRect().x
    shiftY.value = event.clientY - noteIconRef.value.getBoundingClientRect().y
    onDragStart()
  }
}

function onMouseMove(event: MouseEvent) {
  hasTransition.value = false // disable transition when dragging

  const parentContainerElement = document.getElementById('left-side')
  const parentElement = document.getElementById('cv-preview')

  if (noteIconRef.value && parentContainerElement && parentElement) {
    if (!isDragging.value) isDragging.value = true

    const parentRect = parentElement.getBoundingClientRect()
    const rect = noteIconRef.value.getBoundingClientRect()
    const offsetLeft = event.clientX - parentRect.x - shiftX.value
    const offsetTop = event.clientY - parentRect.y - shiftY.value

    if (offsetLeft < 0
      || (offsetLeft + rect.width > parentRect.width)
      || offsetTop < 0
      || (parentRect.top >= 0 && offsetTop + parentRect.top + rect.width > parentRect.bottom)
      || (parentRect.top < 0 && offsetTop + rect.height > parentRect.height)
    ) return

    left.value = offsetLeft / parentRect.width
    top.value = offsetTop / parentRect.height
  }
}

function onMouseUp(event: MouseEvent) {
  toolbar.modifyNote({
    ...props.note,
    location: {
      left: left.value,
      top: top.value,
    },
  })
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
  onDragEnd()

  shiftX.value = 0
  shiftY.value = 0
}
</script>

<template>
  <div ref="noteRef">
    <button
      ref="noteIconRef"
      class="note-icon bg-yellow"
      @click="onToggleNote"
      @mousedown="onMouseDown"
    >
      <span class="i-custom:note w-8 h-8" />
    </button>
    <div
      v-if="show"
      class="note-form bg-yellow"
      :class="[noteClasses, { 'note-move-transition': hasTransition }]"
    >
      <div class="flex justify-between items-center">
        <span class="note text-blacks-70">Note</span>
        <div class="flex items-center gap-3">
          <button v-if="value" class="i-custom:delete icon-24 cursor-pointer" @click="onRemove" />
          <div v-if="value !== props.note.value" class="cursor-pointer" @click="onSave">
            <span class="checkmark " />
          </div>
          <button v-else class="i-custom:cancel icon-24 cursor-pointer" @click="onToggleNote" />
        </div>
      </div>
      <textarea
        ref="editorRef"
        v-model.trim="value"
        placeholder="Note down here..."
        class="form-textarea h-[130px] custom-scrollbar"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.note-icon {
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  top: calc(v-bind('top') * 100%);
  left: calc(v-bind('left') * 100%);
}
.note-form {
  width: 300px;
  height: 200px;
  position: absolute;
  border-radius: 12px;
  padding: 16px;
  z-index: 2;
  top: calc(v-bind('top') * 100%);

  &.note-move-transition {
    transition: all 0.3s;
  }
  &.note-right {
    left: calc((v-bind('left')) * 100% + 40px);
  }
  &.note-left {
    left: calc((v-bind('left')) * 100% - 320px);
  }
  &.note-bottom {
    top: calc(v-bind('top') * 100% - 170px);
  }
  &.note-top {
    top: calc(v-bind('top') * 100%);
  }
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
</style>
