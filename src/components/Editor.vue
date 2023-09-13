<script lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { Quill } from '@vueup/vue-quill'
import type { RangeStatic } from 'quill'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia'
import { useToolbarStore } from '~/stores/toolbar'

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
    const toolbar = useToolbarStore()
    const { isMobileScreen } = storeToRefs(toolbar)
    const root = ref<HTMLDivElement | null>(null)
    const editor = ref<HTMLDivElement | null>(null)
    const toolbarId = ref(`toolbar-${uuidv4().replaceAll('-', '')}`)
    const toolbarVisible = ref(false)
    const selectionRange = ref<RangeStatic | null>(null)
    const linkTooltip = ref<HTMLDivElement | null>(null)
    const linkEdit = ref<HTMLDivElement | null>(null)
    const linkTooltipVisible = ref(false)
    const linkEditVisible = ref(false)
    const selectedAnchor = ref<HTMLAnchorElement | null>(null)
    const draftLink = ref('')
    const link = ref('')

    const content = computed({
      get: () => {
        const value = props.modelValue === undefined ? '' : props.modelValue
        // if (editor.value) {
        //   editor.value.setHTML(value)
        //   nextTick(() => {
        //     const quill = editor.value.getQuill()
        //     quill.setSelection(value.length, 0, 'user')
        //     quill.focus()
        //   })
        // }

        return value
      },
      set: (value) => {
        createAnchorListeners()
        emit('update:modelValue', value)
      },
    })

    const linkTooltipStyle = computed(() => {
      const style: CSSProperties = {
        left: 0,
        right: 0,
      }

      if (linkTooltip.value && selectedAnchor.value) {
        const anchor = selectedAnchor.value
        const parentWidth = root.value?.clientWidth
        if (parentWidth)
          style.top = `${anchor.offsetTop + anchor.offsetHeight + 8}px`
      }
      return style
    })

    const linkEditStyle = computed(() => {
      const style: CSSProperties = {
        left: 0,
        right: 0,
      }

      if (selectedAnchor.value) {
        const anchor = selectedAnchor.value
        style.top = `${anchor.offsetTop + anchor.offsetHeight + 8}px`
      }
      else if (editor.value && selectionRange.value) {
        const { index, length } = selectionRange.value
        const quill = (editor.value as Quill).getQuill()
        const bounds = quill.getBounds(index, length)
        style.top = `${bounds.bottom + 8}px`
      }
      return style
    })

    onMounted(() => {
      if (editor.value) {
        const editorElement = (editor.value as Quill).getEditor()
        const quill = (editor.value as Quill).getQuill()
        const toolbar = quill.getModule('toolbar')

        // customize link handler
        toolbar.addHandler('link', (value) => {
          if (value) {
            linkEditVisible.value = true
            resetLink()
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

        // clear text formatting on paste (https://github.com/quilljs/quill/issues/1184)
        quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
          const ops: any[] = []
          delta.ops.forEach((op) => {
            if (op.insert && typeof op.insert === 'string') {
              // remove line break if editor is single line
              if (props.isSingleLine)
                ops.push({ insert: op.insert.replaceAll('\n', '') })
              else
                ops.push({ insert: op.insert })
            }
          })
          delta.ops = ops
          return delta
        })

        editorElement.addEventListener('keydown', (event) => {
          const keyboardEvent = event as KeyboardEvent
          if (['Equal', 'Minus'].includes(keyboardEvent.code)) {
            // prevent zoom in/out
            keyboardEvent.stopPropagation()
          }
        })
      }

      createAnchorListeners()
    })

    watch(isMobileScreen, () => {
      handleToolbarVisible()
    })

    watch(toolbarVisible, () => {
      handleToolbarVisible()
    })

    onClickOutside(linkEdit, (event) => {
      closeLinkEdit()
    })

    function createAnchorListeners() {
      document.querySelectorAll('.ql-editor a').forEach((element) => {
        element.addEventListener('click', (e) => {
          e.stopPropagation()
          const anchor = (e.target as HTMLAnchorElement)
          openLinkTooltip(anchor)
        })
      })
    }

    function handleToolbarVisible() {
      const editorElement = (editor.value as Quill).getEditor()
      if (toolbarVisible.value) {
        editorElement.style.transition = 'padding 0.3s'
        editorElement.style.paddingTop = isMobileScreen.value ? '60px' : '52px'
      }
      else { editorElement.style.paddingTop = '12px' }
    }

    function onFocus(elementRef) {
      toolbarVisible.value = true

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

    function onBlur() {
      if (!linkEditVisible.value)
        toolbarVisible.value = false

      closeLinkTooltip()
    }

    function preventEnter(event) {
      if (event.key === 'Enter')
        event.preventDefault()
    }

    function onClear() {
      if (editor.value)
        (editor.value as Quill).setHTML('')
    }

    function onLinkChange() {
      if (selectedAnchor.value) {
        selectedAnchor.value.href = draftLink.value
      }
      else if (editor.value && draftLink.value) {
        const quill = (editor.value as Quill).getQuill()
        quill.format('link', draftLink.value)
        resetLink()
      }

      closeLinkEdit()
    }

    function openLinkTooltip(anchor: HTMLAnchorElement) {
      linkTooltipVisible.value = true
      setLink(anchor)
    }

    function closeLinkTooltip() {
      linkTooltipVisible.value = false
    }

    function closeLinkEdit() {
      linkTooltipVisible.value = false
      linkEditVisible.value = false
      selectedAnchor.value = null
      resetLink()
    }

    function openLinkEdit() {
      linkTooltipVisible.value = false
      linkEditVisible.value = true
    }

    function removeLink() {
      if (selectedAnchor.value)
        selectedAnchor.value.replaceWith(selectedAnchor.value.innerText)

      closeLinkEdit()
    }

    function setLink(anchor: HTMLAnchorElement) {
      selectedAnchor.value = anchor
      link.value = anchor.getAttribute('href') || ''
      draftLink.value = link.value
    }

    function resetLink() {
      selectedAnchor.value = null
      draftLink.value = ''
      link.value = ''
    }

    function onEditorChange(data) {
      if (data.name === 'selection-change' && data.range)
        selectionRange.value = data.range

      closeLinkTooltip()
    }

    return {
      isMobileScreen,
      root,
      editor,
      toolbarId,
      toolbarVisible,
      linkTooltip,
      linkEdit,
      linkTooltipVisible,
      linkEditVisible,
      linkTooltipStyle,
      linkEditStyle,
      selectedAnchor,
      draftLink,
      link,
      content,
      onFocus,
      onBlur,
      onClear,
      onLinkChange,
      closeLinkEdit,
      openLinkEdit,
      removeLink,
      resetLink,
      onEditorChange,
    }
  },
})
</script>

<template>
  <div
    ref="root"
    class="relative transition-[height] duration-300"
    :class="[
      className,
      isSingleLine ? (toolbarVisible ? 'h-[94px] sm:h-[86px]' : 'h-[46px]') : (toolbarVisible ? 'h-[228px] sm:h-[220px]' : 'h-[180px]')
    ]"
  >
    <QuillEditor
      ref="editor"
      v-model:content="content"
      content-type="html"
      :enable="enable"
      :read-only="!enable"
      :placeholder="(content === '' || content === '<p><br></p>') ? placeholder : ''"
      theme=""
      :toolbar="`#${toolbarId}`"
      class="deletable"
      :class="{ 'single-line': isSingleLine }"
      @focus="onFocus"
      @blur="onBlur"
      @editor-change="onEditorChange"
    />

    <button
      v-if="enable && content !== '<p><br></p>'"
      class="btn-clear i-custom:cancel w-6 h-6 absolute right-2 bg-blacks-40 opacity-0 transition-[top] duration-300"
      :class="isSingleLine ? (toolbarVisible ? 'top-[50%] top-[71px] sm:top-[63px] -translate-y-1/2' : 'top-[50%] -translate-y-1/2') : (toolbarVisible ? 'top-[59px] sm:top-[51px]' : 'top-[11px]')"
      @click="onClear"
    />

    <div
      :id="toolbarId"
      class="ql-toolbar"
      :class="isMobileScreen ? 'h-[48px]' : 'h-[40px]'"
      :style="{
        'visibility': enable && toolbarVisible ? 'visible' : 'hidden',
        'opacity': enable && toolbarVisible ? 1 : 0
      }"
    >
      <div class="toolbar-button-group">
        <button class="ql-list" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'" value="bullet">
          <span class="i-custom:list-bullet" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
        </button>
        <button class="ql-list" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'" value="ordered">
          <span class="i-custom:list-number" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
        </button>
        <button class="ql-indent" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'" value="+1">
          <span class="i-custom:indent" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
        </button>
        <button class="ql-indent" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'" value="-1">
          <span class="i-custom:unindent" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
        </button>
        <button class="ql-bold" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'">
          <span class="i-custom:bold" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
        </button>
        <button class="ql-italic" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'">
          <span class="i-custom:italic" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
        </button>
        <button class="ql-background" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'">
          <span class="i-origin:highlight" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
        </button>
        <button class="ql-link" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'">
          <span class="i-custom:link" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
        </button>
      </div>
    </div>

    <div
      v-if="toolbarVisible && linkTooltipVisible && !linkEditVisible"
      ref="linkTooltip"
      class="absolute z-20 flex justify-between px-3 py-2 bg-white border-1 border-black rounded-xl shadow-custom"
      :style="linkTooltipStyle"
    >
      <a
        class="paragraph text-blacks-100 truncate"
        target="_blank"
        :href="`//${link}`"
      >
        {{ link }}
      </a>
      <div class="whitespace-nowrap">
        <button
          class="note pl-2 border-l border-blacks-20 text-blacks-40 sm:hover:text-blacks-70 transition-[color] duration-300"
          @click="openLinkEdit"
        >
          Edit
        </button>
        <button
          class="note text-blacks-40 ml-2 sm:hover:text-blacks-70 transition-[color] duration-300"
          @click="removeLink"
        >
          Remove
        </button>
      </div>
    </div>

    <div
      v-if="linkEditVisible"
      ref="linkEdit"
      class="absolute z-20 bg-white p-4 rounded-[1.25rem] shadow-custom"
      :style="linkEditStyle"
    >
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <div class="w-8 h-8 flex justify-center items-center">
            <span class="i-custom:link w-6 h-6 text-blacks-70" />
          </div>
          <span class="leading text-blacks-100">Link</span>
        </div>
        <button @click="closeLinkEdit">
          <span class="i-custom:cancel w-5 h-5 text-blacks-40 sm:hover:text-blacks-70" />
        </button>
      </div>
      <div class="relative mt-4">
        <input
          v-model="draftLink"
          type="text"
          placeholder="http://"
          class="pr-10 form-input bg-primary-10"
          @keyup.enter="onLinkChange"
        >
        <button
          class="w-6 h-6 absolute top-[50%] right-2 -translate-y-1/2 transition-[opacity] duration-300"
          :class="{'opacity-0': !draftLink}"
          @click="onLinkChange"
        >
          <span class="i-custom:ok w-6 h-6 text-blacks-40 sm:hover:text-blacks-70" />
        </button>
      </div>
      <div v-if="link" class="text-right mt-3">
        <button
          class="note text-blacks-40 sm:hover:text-blacks-70 transition-[color] duration-300"
          @click="removeLink"
        >
          Remove Link
        </button>
      </div>
      <div class="fix-margin-bottom" style="top: 126px; bottom: 0; left: 0;" />
    </div>
  </div>
</template>

<style>
.ql-container {
  @apply w-full h-full relative bg-white rounded-xl border-1 border-white sm:hover:border-blacks-100 sm:hover:disabled:border-white focus:text-blacks-100;
}

.ql-container:not(.single-line) {
  @apply pl-4 pr-1 py-3;
}
.ql-container.single-line {
  @apply px-4 py-3;
}

.ql-disabled {
  @apply text-blacks-40 sm:hover:border-white bg-blacks-5 border-blacks-5;
}

.single-line [contenteditable] {
  overflow: hidden;
  white-space: nowrap;
}

.ql-editor {
  @apply pl-0 pr-6 py-0;
}
.single-line .ql-editor {
  @apply h-[22px] p-0 mr-4;
}
.btn-clear:hover {
@apply opacity-100 bg-blacks-70;
}
.deletable:hover + .btn-clear {
  @apply opacity-100;
}

.ql-editor {
  /* For Firefox */
  scrollbar-color: rgba(34, 34, 34, 0.1) transparent;
  scrollbar-width: thin;
}
.ql-editor::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.ql-editor::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgba(34, 34, 34, 0.1);
}

.ql-editor p,
.ql-editor ul li,
.ql-editor ol li {
  @apply font-mark font-normal text-base leading-[1.375rem] text-blacks-100;
}
.ql-disabled .ql-editor p,
.ql-disabled .ql-editor ul li,
.ql-disabled .ql-editor ol li{
  @apply text-blacks-40;
}

.ql-editor.ql-blank::before {
  @apply font-mark font-normal text-base leading-[1.375rem] text-blacks-40;
  font-style: normal;
}

.ql-editor a {
  text-decoration: underline;
}

.ql-editor ol {
  @apply pl-4;
  list-style: none;
}
.ql-editor ol li:not(.ql-direction-rtl) {
  @apply pl-0;
}
.ql-editor ol li:not(.ql-direction-rtl)::before {
  display: inline-block;
  width: 1rem;
  margin-left: -1rem;
}
.ql-editor li:not(.ql-direction-rtl)::before {
  @apply mr-0 text-left;
}

.ql-editor ul {
  @apply pl-4;
  list-style: none;
}
.ql-editor ul li:not(.ql-direction-rtl) {
  @apply pl-0;
}
.ql-editor ul li:not(.ql-direction-rtl)::before {
  content: '•';
  display: inline-block;
  width: 1rem;
  margin-left: -1rem;
}

.ql-editor .ql-indent-1:not(.ql-direction-rtl),
.ql-editor li.ql-indent-1:not(.ql-direction-rtl) {
  @apply pl-4;
}
.ql-editor .ql-indent-2:not(.ql-direction-rtl),
.ql-editor li.ql-indent-2:not(.ql-direction-rtl) {
  @apply pl-8;
}
.ql-editor .ql-indent-3:not(.ql-direction-rtl),
.ql-editor li.ql-indent-3:not(.ql-direction-rtl) {
  @apply pl-12;
}
.ql-editor .ql-indent-4:not(.ql-direction-rtl),
.ql-editor li.ql-indent-4:not(.ql-direction-rtl) {
  @apply pl-16;
}
.ql-editor .ql-indent-5:not(.ql-direction-rtl),
.ql-editor li.ql-indent-5:not(.ql-direction-rtl) {
  @apply pl-20;
}
.ql-editor .ql-indent-6:not(.ql-direction-rtl),
.ql-editor li.ql-indent-6:not(.ql-direction-rtl) {
  @apply pl-24;
}
.ql-editor .ql-indent-7:not(.ql-direction-rtl),
.ql-editor li.ql-indent-7:not(.ql-direction-rtl) {
  @apply pl-28;
}
.ql-editor .ql-indent-8:not(.ql-direction-rtl),
.ql-editor li.ql-indent-8:not(.ql-direction-rtl) {
  @apply pl-32;
}
.ql-editor .ql-indent-9:not(.ql-direction-rtl),
.ql-editor li.ql-indent-9:not(.ql-direction-rtl) {
  @apply pl-36;
}
.ql-editor .ql-indent-10:not(.ql-direction-rtl),
.ql-editor li.ql-indent-10:not(.ql-direction-rtl) {
  @apply pl-40;
}

.ql-toolbar {
  @apply absolute top-0 left-0 right-0 z-1 h-12 p-2 m-[1px] bg-white rounded-t-xl sm:h-10;
  transition: visibility 0.15s linear, opacity 0.15s linear;
}
.toolbar-button-group {
  @apply flex justify-center gap-2;
  overflow-x: scroll;
  scrollbar-width: none;    /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.toolbar-button-group::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: transparent; /* Chrome/Safari */
}
.ql-toolbar::after {
  @apply absolute -left-[1px] -right-[1px] bottom-0 border-b border-b-blacks-20;
  content: '';
}

.ql-active {
  @apply bg-primary-10 rounded-full;
}

.fix-margin-bottom {
  content: '';
  width: 100%;
  height: 32px;
  background-color: transparent;
  position: absolute;
  bottom: -32px;
  z-index: -1;
}
</style>
