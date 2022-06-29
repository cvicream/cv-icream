<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  components: {
    QuillEditor,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    enable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    isSingleLine: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup: (props, { emit }) => {
    const root = ref(null)
    const editor = ref(null)
    const toolbarId = ref(`toolbar-${uuidv4().replaceAll('-', '')}`)
    const toolbarTop = ref(0)
    const toolbarVisible = ref(false)
    const link = ref('')
    const linkVisible = ref(false)

    const content = computed({
      get: () => {
        const value = props.modelValue === undefined ? '' : props.modelValue
        if (editor.value) {
          editor.value.setHTML(value)
          nextTick(() => {
            const quill = editor.value.getQuill()
            quill.setSelection(value.length, 0, 'user')
            quill.focus()
          })
        }

        return value
      },
      set: (value) => {
        emit('update:modelValue', value)
      },
    })

    onMounted(() => {
      if (editor.value) {
        const quill = editor.value.getQuill()
        const toolbar = quill.getModule('toolbar')

        // customize link handler
        toolbar.addHandler('link', (value) => {
          if (value) {
            toolbarVisible.value = false
            linkVisible.value = true
          }
          else {
            quill.format('link', false)
          }
        })

        // customize background handler
        toolbar.addHandler('background', (value) => {
          if (value)
            quill.format('background', 'var(--secondary-color)')
          else
            quill.format('background', false)
        })
      }
    })

    function onFocus(elementRef) {
      const obj = elementRef.value.getBoundingClientRect()
      toolbarTop.value = obj.height + 8

      if (root.value) {
        const elEditor = (root.value as HTMLElement).querySelector('.single-line [contenteditable="true"]')
        if (elEditor) {
          if (props.isSingleLine)
            elEditor.addEventListener('keydown', preventEnter, true)
          else
            elEditor.removeEventListener('keydown', preventEnter, true)
        }
      }
    }

    function preventEnter(event) {
      if (event.key === 'Enter')
        event.preventDefault()
    }

    function selectionChange({ range, oldRange, source }) {
      toolbarVisible.value = range && range.length > 0
    }

    function onClear() {
      if (editor.value)
        editor.value.setHTML('')
    }

    function onLinkBlur() {
      if (editor.value && link.value) {
        const quill = editor.value.getQuill()
        quill.format('link', link.value)
      }

      onLinkClose()
    }

    function onLinkClose() {
      linkVisible.value = false
      link.value = ''
    }

    return {
      root,
      editor,
      toolbarId,
      toolbarTop,
      toolbarVisible,
      link,
      linkVisible,
      content,
      onFocus,
      selectionChange,
      onClear,
      onLinkBlur,
      onLinkClose,
    }
  },
})
</script>

<template>
  <div
    ref="root"
    class="relative"
    :class="className"
    :style="{
      '--toolbar-top': toolbarTop + 'px'
    }"
  >
    <QuillEditor
      ref="editor"
      v-model:content="content"
      content-type="html"
      :enable="enable"
      :read-only="false"
      :placeholder="placeholder"
      theme=""
      :toolbar="`#${toolbarId}`"
      :class="{ 'single-line': isSingleLine }"
      @focus="onFocus"
      @blur="toolbarVisible = false"
      @selection-change="selectionChange"
    />

    <button
      v-if="isSingleLine && enable && content !== '<p><br></p>'"
      class="btn-clear"
      @click="onClear"
    />

    <div
      :id="toolbarId"
      :style="{
        'visibility': enable && toolbarVisible ? 'visible' : 'hidden',
        'opacity': enable && toolbarVisible ? 1 : 0
      }"
    >
      <button class="ql-list btn-icon-32" value="bullet">
        <span class="i-custom:list-bullet w-6 h-6" />
      </button>
      <button class="ql-list btn-icon-32" value="ordered">
        <span class="i-custom:list-number w-6 h-6" />
      </button>
      <button class="ql-indent btn-icon-32" value="+1">
        <span class="i-custom:indent w-6 h-6" />
      </button>
      <button class="ql-indent btn-icon-32" value="-1">
        <span class="i-custom:unindent w-6 h-6" />
      </button>
      <button class="ql-bold btn-icon-32">
        <span class="i-custom:bold w-6 h-6" />
      </button>
      <button class="ql-italic btn-icon-32">
        <span class="i-custom:italic w-6 h-6" />
      </button>
      <button class="ql-background btn-icon-32">
        <span class="i-origin:highlight w-6 h-6" />
      </button>
      <button class="ql-link btn-icon-32">
        <span class="i-custom:link w-6 h-6" />
      </button>
    </div>

    <div
      v-if="linkVisible"
      class="w-[232px] h-[126px] absolute top-[var(--toolbar-top)] right-0 bg-primary-10 p-4 rounded-[1.25rem] shadow-custom"
    >
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <div class="w-8 h-8 flex justify-center items-center">
            <span class="i-custom:link w-6 h-6 text-blacks-70" />
          </div>
          <span class="leading text-blacks-100">Link</span>
        </div>
        <button @click="onLinkClose">
          <span class="i-custom:cancel w-5 h-5 text-blacks-40 hover:text-blacks-70" />
        </button>
      </div>
      <input
        v-model="link"
        type="search"
        placeholder="http://"
        class="form-input mt-4"
        @keyup.enter="onLinkBlur"
        @blur="onLinkBlur"
      >
      <div class="fix-margin-bottom" />
    </div>

    <div class="fix-margin-bottom" />
  </div>
</template>

<style>
.ql-container {
  @apply w-full h-full relative bg-white rounded-xl mt-1 border-1 border-white hover:border-blacks-100 hover:disabled:border-white focus:text-blacks-100;
}

.ql-container:not(.single-line) {
  @apply pl-4 pr-1 py-2;
}
.ql-container.single-line {
  @apply px-4 py-3;
}

.ql-disabled {
  @apply text-blacks-40 hover:border-white;
}

.single-line [contenteditable] {
  overflow: hidden;
  white-space: nowrap;
}

.ql-editor {
  @apply pl-0 pr-2 py-1;
}
.single-line .ql-editor {
  @apply p-0 mr-4;
}

.btn-clear {
  @apply i-custom:cancel w-6 h-6 absolute top-[50%] right-2 bg-blacks-40 opacity-0;
  transform: translateY(-50%);
}
.btn-clear:hover {
  @apply opacity-100 bg-blacks-70 cursor-pointer;
}
.single-line:hover + .btn-clear {
  @apply opacity-100;
}

.ql-editor::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.ql-editor::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgba(34, 34, 34, 0.1);
}

.ql-editor p {
  @apply paragraph text-blacks-100 disabled:text-blacks-40
}
.ql-disabled .ql-editor p {
  @apply text-blacks-40;
}

.ql-editor.ql-blank::before {
  @apply paragraph text-blacks-40;
  font-style: normal;
}

.ql-toolbar {
  @apply absolute left-0 right-0 z-1 h-12 p-2 flex gap-2 bg-white rounded-12 shadow-custom;
  top: var(--toolbar-top);
  transition: visibility 0.15s linear, opacity 0.15s linear;
  overflow-x: scroll;
  scrollbar-width: none;    /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.ql-toolbar::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: transparent; /* Chrome/Safari */
}

.ql-active {
  @apply bg-primary-10;
}

.fix-margin-bottom {
  content: '';
  width: 100%;
  height: 8px;
  background-color: transparent;
  position: absolute;
  bottom: -64px;
}
</style>
