<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { Quill, QuillEditor } from '@vueup/vue-quill'

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
    const root = ref(null)
    const editor = ref(null)
    const toolbarId = ref(`toolbar-${uuidv4().replaceAll('-', '')}`)
    const toolbarTop = ref(0)
    const toolbarVisible = ref(false)
    const draftLink = ref('')
    const link = ref('')
    const linkEditVisible = ref(false)
    const linkHoverPosition = ref({ x: 0, y: 0 })
    const linkHoverVisible = ref(false)
    const showIconPopover = ref(false)

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

    onMounted(() => {
      if (editor.value) {
        const quill = (editor.value as Quill).getQuill()
        const toolbar = quill.getModule('toolbar')

        // customize link handler
        toolbar.addHandler('link', (value) => {
          if (value)
            linkEditVisible.value = true
          else
            quill.format('link', false)
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

        const BlockEmbed = Quill.import('blots/block/embed')
        class IconBlot extends BlockEmbed {
          static create(data) {
            const node = super.create(data) as HTMLElement
            const child = document.createElement('span')
            child.className = `i-custom:${data} custom-icon w-[10px] h-[10px] text-white`

            node.setAttribute('class', 'icon-mask')
            node.appendChild(child)
            return node
          }

          static value(domNode) {
            const { src, custom } = domNode.dataset
            return { src, custom }
          }
        }
        IconBlot.blotName = 'iconBlot'
        IconBlot.tagName = 'div'
        Quill.register({ 'formats/iconBlot': IconBlot })
      }

      createAnchorListeners()
    })

    watch(isMobileScreen, () => {
      handleToolbarVisible()
    })

    watch(toolbarVisible, () => {
      handleToolbarVisible()
    })

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

    function onBlur() {
      if (!linkEditVisible.value && !showIconPopover.value)
        toolbarVisible.value = false

      closeLinkHover()
    }

    function preventEnter(event) {
      if (event.key === 'Enter')
        event.preventDefault()
    }

    function onClear() {
      if (editor.value)
        (editor.value as Quill).setHTML('')
    }

    function onLinkBlur() {
      if (editor.value && draftLink.value) {
        const quill = (editor.value as Quill).getQuill()
        quill.format('link', draftLink.value)
        resetLink()
      }

      closeLinkEdit()
    }

    function closeLinkEdit() {
      linkEditVisible.value = false
      resetLink()
    }

    function openLinkEdit() {
      linkHoverVisible.value = false
      linkEditVisible.value = true
    }

    function createAnchorListeners() {
      document.querySelectorAll('.ql-editor a').forEach((element) => {
        element.addEventListener('mouseover', (e) => {
          e.stopPropagation()
          const anchor = (e.target as HTMLAnchorElement)
          const rect = anchor.getBoundingClientRect()
          linkHoverPosition.value = { x: rect.left, y: rect.bottom + 8 }
          link.value = anchor.href
          draftLink.value = link.value
          linkHoverVisible.value = true
        })
      })
    }

    function closeLinkHover() {
      linkHoverPosition.value = { x: 0, y: 0 }
      linkHoverVisible.value = false
    }

    function removeLink() {
      const quill = (editor.value as Quill).getQuill()
      quill.format('link', false)
      linkEditVisible.value = false
      resetLink()
    }

    function resetLink() {
      draftLink.value = ''
      link.value = ''
    }

    function onEditorChange(data) {
      closeLinkHover()
    }

    function onClickIcon() {
      showIconPopover.value = !showIconPopover.value
    }

    function closeIconPopover() {
      showIconPopover.value = false
    }

    return {
      isMobileScreen,
      root,
      editor,
      toolbarId,
      toolbarTop,
      toolbarVisible,
      draftLink,
      link,
      linkEditVisible,
      linkHoverPosition,
      linkHoverVisible,
      content,
      showIconPopover,
      onFocus,
      onBlur,
      onClear,
      onLinkBlur,
      closeLinkEdit,
      openLinkEdit,
      removeLink,
      resetLink,
      onEditorChange,
      onClickIcon,
      closeIconPopover,
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
    :style="{
      // @ts-ignore
      '--toolbar-top': toolbarTop + 'px'
    }"
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
        <button :onclick="onClickIcon" :class="isMobileScreen ? 'btn-icon-32 p-1' : 'btn-icon-24 p-0'">
          <span class="i-custom:icon" :class="isMobileScreen ? 'w-7 h-7' : 'w-5.5 h-5.5'" />
        </button>
      </div>
    </div>

    <div
      v-if="linkHoverVisible && toolbarVisible"
      class="fixed flex justify-between gap-2 px-3 py-2 bg-white border-1 border-black rounded-xl shadow-custom  z-11"
      :style="{top: `${linkHoverPosition.y}px`, left: `${linkHoverPosition.x}px`}"
    >
      <a
        class="paragraph text-blacks-100 truncate"
        target="_blank"
        :href="link"
      >
        {{ link }}
      </a>
      <button
        class="note pl-2 border-l border-blacks-20 text-blacks-40 hover:text-blacks-70 transition-[color] duration-300"
        @click="openLinkEdit"
      >
        Edit
      </button>
    </div>

    <div
      v-if="linkEditVisible"
      class="absolute top-[var(--toolbar-top)] left-0 right-0 z-10 bg-white p-4 rounded-[1.25rem] shadow-custom"
    >
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <div class="w-8 h-8 flex justify-center items-center">
            <span class="i-custom:link w-6 h-6 text-blacks-70" />
          </div>
          <span class="leading text-blacks-100">Link</span>
        </div>
        <button @click="closeLinkEdit">
          <span class="i-custom:cancel w-5 h-5 text-blacks-40 hover:text-blacks-70 transition-[color] duration-300" />
        </button>
      </div>
      <div class="relative mt-4">
        <input
          v-model="draftLink"
          type="text"
          placeholder="http://"
          class="form-input bg-primary-10"
          @keyup.enter="onLinkBlur"
          @blur="onLinkBlur"
        >
        <button
          class="w-6 h-6 absolute top-[50%] right-2 -translate-y-1/2 transition-[opacity] duration-300"
          :class="{'opacity-0': !draftLink}"
          @click="onLinkBlur"
        >
          <span class="i-custom:ok w-6 h-6 text-blacks-40 hover:text-blacks-70" />
        </button>
      </div>
      <div v-if="link" class="text-right mt-3">
        <button
          class="note text-blacks-40 hover:text-blacks-70 transition-[color] duration-300"
          @click="removeLink"
        >
          Remove Link
        </button>
      </div>
      <div class="fix-margin-bottom" style="top: 126px; bottom: 0; left: 0;" />
    </div>

    <IconPopover v-if="showIconPopover" :close-icon-popover="closeIconPopover" :editor="editor" />
  </div>
</template>

<style>
.ql-container {
  @apply w-full h-full relative bg-white rounded-xl border-1 border-white hover:border-blacks-100 hover:disabled:border-white focus:text-blacks-100;
}

.ql-container:not(.single-line) {
  @apply pl-4 pr-1 py-3;
}
.ql-container.single-line {
  @apply px-4 py-3;
}

.ql-disabled {
  @apply text-blacks-40 hover:border-white bg-blacks-5 border-blacks-5;
}

.single-line [contenteditable] {
  overflow: hidden;
  white-space: nowrap;
}

.ql-editor {
  @apply pl-0 pr-5 py-0;
}
.single-line .ql-editor {
  @apply h-[24px] p-0 mr-4;
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
  @apply bg-primary-10;
}

.fix-margin-bottom {
  content: '';
  width: 100%;
  height: 8px;
  background-color: transparent;
  position: absolute;
  bottom: -64px;
  z-index: -1;
}

.icon-mask {
  background-color: var(--primary-color);
  border-radius: 50%;
  opacity: 70%;
  cursor: pointer;
  height: 16px;
  width: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}

.custom-icon {
  width: 10px;
  height: 10px;
  color: white;
}
</style>
