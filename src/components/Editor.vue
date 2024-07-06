<script lang="ts">
import type { CSSProperties, PropType } from 'vue'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { onClickOutside, useElementSize } from '@vueuse/core'
import type { Quill } from '@vueup/vue-quill'
import type { RangeStatic } from 'quill'
import { QuillEditor } from '@vueup/vue-quill'
import VueDatePicker from '@vuepic/vue-datepicker'
import type { DatePickerInstance } from '@vuepic/vue-datepicker'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import '@vuepic/vue-datepicker/dist/main.css'
import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash'
import { useToolbarStore } from '~/stores/toolbar'
import type { Option } from '~/types'
import { defaultChatGPTQuestionOptions, defaultEditorToolOptions } from '~/constants'
import { isSameMonth, isValidHttpUrl } from '~/utils'

export default defineComponent({
  components: {
    QuillEditor,
    VueDatePicker,
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
    chatgptEnable: {
      type: Boolean,
      default: false,
    },
    datepickerEnable: {
      type: Boolean,
      default: false,
    },
    toolOptions: {
      type: Array as PropType<Array<Option>>,
      default: cloneDeep(defaultEditorToolOptions),
    },
    chatgptQuestionOptions: {
      type: Array as PropType<Array<Option>>,
      default: cloneDeep(defaultChatGPTQuestionOptions),
    },
    showLinkTool: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  setup: (props, { emit }) => {
    const toolbar = useToolbarStore()
    const { isMobileScreen } = storeToRefs(toolbar)
    const root = ref<HTMLDivElement | null>(null)
    const { width } = useElementSize(root)
    const editor = ref<HTMLDivElement | null>(null)
    const toolbarId = ref(`toolbar-${uuidv4().replaceAll('-', '')}`)
    const isToolbarLoading = ref(false)
    const toolbarVisible = ref(false)
    const selectionRange = ref<RangeStatic | null>(null)
    const linkTooltip = ref<HTMLDivElement | null>(null)
    const linkEdit = ref<HTMLDivElement | null>(null)
    const linkTooltipVisible = ref(false)
    const linkEditVisible = ref(false)
    const chatGPTId = ref(`chatgpt-${uuidv4().replaceAll('-', '')}`)
    const chatGPTEdit = ref<HTMLDivElement | null>(null)
    const chatGPTEditVisible = ref(false)
    const selectedAnchor = ref<HTMLAnchorElement | null>(null)
    const draftLink = ref('')
    const link = ref('')
    const tooltipText = ref('')
    const datepicker = ref<DatePickerInstance>(null)
    const internalDateRange = ref<Date | Date[]>([])
    const isPresent = ref(false)

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
        if (parentWidth) {
          let top = anchor.offsetTop + anchor.offsetHeight
          top = top > 220 ? 220 : top // max height of Editor component is 220px
          style.top = `${top + 8}px`
        }
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
        let top = anchor.offsetTop + anchor.offsetHeight
        top = top > 220 ? 220 : top // max height of Editor component is 220px
        style.top = `${top + 8}px`
      }
      else if (editor.value && selectionRange.value) {
        const { index, length } = selectionRange.value
        const quill = (editor.value as Quill).getQuill()
        const bounds = quill.getBounds(index, length)
        style.top = `${bounds.bottom + 8}px`
      }
      return style
    })

    const selectedText = computed(() => {
      if (selectionRange.value) {
        const { index, length } = selectionRange.value
        if (length) {
          const quill = (editor.value as Quill).getQuill()
          const text = quill.getText(index, length)
          return text
        }
      }
      return ''
    })

    const isMobileDatePicker = computed(() => width.value < 500)

    const isValidDraftLink = computed(() => isValidHttpUrl(draftLink.value))

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

    watch(linkEditVisible, () => {
      if (linkEditVisible.value) {
        setTimeout(() => {
          linkEdit.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
      }
    })

    watch(linkTooltipVisible, () => {
      if (linkTooltipVisible.value) {
        setTimeout(() => {
          linkTooltip.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
      }
    })

    onClickOutside(chatGPTEdit, (event) => {
      chatGPTEditVisible.value = false
    })

    onClickOutside(linkEdit, (event) => {
      closeLinkEdit()
    })

    function isToolEnabled(value: string) {
      return props.toolOptions && props.toolOptions.find(option => option.value === value)
    }

    function createAnchorListeners() {
      document.querySelectorAll('.ql-editor a').forEach((element) => {
        element.addEventListener('click', (e) => {
          e.stopPropagation()

          // do nothing if toolbar is loading
          if (isToolbarLoading.value) return

          const anchor = (e.currentTarget as HTMLAnchorElement)
          openLinkTooltip(anchor)
        })
      })
    }

    function handleToolbarVisible() {
      const editorElement = (editor.value as Quill).getEditor()
      if (toolbarVisible.value) {
        editorElement.style.transition = 'padding 0.3s'
        editorElement.style.paddingTop = isMobileScreen.value ? '60px' : '52px'

        // handle toolbar loading
        isToolbarLoading.value = true
        setTimeout(() => {
          isToolbarLoading.value = false
        }, 300)
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
      if (!isValidDraftLink.value) return

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
      if (selectedAnchor.value) {
        const style = selectedAnchor.value.getAttribute('style')
        if (selectedAnchor.value.firstElementChild) {
          if (style) selectedAnchor.value.firstElementChild.setAttribute('style', style)
          selectedAnchor.value.outerHTML = selectedAnchor.value.innerHTML
        }
        else {
          if (style) {
            // text node
            const span = document.createElement('span')
            span.innerHTML = selectedAnchor.value.innerHTML
            span.setAttribute('style', style)
            selectedAnchor.value.outerHTML = span.outerHTML
          }
          else {
            selectedAnchor.value.outerHTML = selectedAnchor.value.innerHTML
          }
        }
      }

      closeLinkEdit()
    }

    function setLink(anchor: HTMLAnchorElement) {
      selectedAnchor.value = anchor
      link.value = anchor.href || ''
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

    function onChatGPTClick() {
      if (selectedText.value) {
        chatGPTEditVisible.value = true
        setTimeout(() => {
          document.querySelector(`#${chatGPTId.value}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      }
    }

    function onMouseOver(event: MouseEvent, val: string) {
      switch (val) {
        case 'chatgpt':
          tooltipText.value = !selectedText.value ? 'Select text to start with AI' : 'Write with AI'
          break
      }
    }

    function onMouseOut() {
      tooltipText.value = ''
    }

    function formatDate(value) {
      if (Array.isArray(value)) {
        const [startDate, endDate] = value
        const res: string[] = []
        if (startDate) res.push(startDate.toLocaleString('default', { year: 'numeric', month: 'long' }))
        if (isPresent.value) res.push('Present')
        else if (endDate) res.push(endDate.toLocaleString('default', { year: 'numeric', month: 'long' }))
        return res.join(' - ')
      }
      else if (value instanceof Date) {
        return value.toLocaleString('default', { year: 'numeric', month: 'long' })
      }
      return ''
    }

    function toggleDatePicker() {
      if (datepicker.value) {
        datepicker.value.toggleMenu()
        setTimeout(() => {
          datepicker.value?.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
      }
    }

    function onInternalDateChange(value: Date | Date[]) {
      internalDateRange.value = value
      isPresent.value = value && value[1] && isSameMonth(value[1], new Date())
    }

    function onDateChange(modelData: { year: number; month: number }[]) {
      const [startData, endData] = modelData
      const res: string[] = []
      if (startData) res.push(new Date(startData.year, startData.month).toLocaleString('default', { year: 'numeric', month: 'long' }))
      if (isPresent.value) res.push('Present')
      else if (endData) res.push(new Date(endData.year, endData.month).toLocaleString('default', { year: 'numeric', month: 'long' }))
      const text = res.join(' - ')
      if (editor.value) {
        const quill = (editor.value as Quill).getQuill()
        const selection = quill.getSelection(true)
        const index = selection ? selection.index : 0
        quill.insertText(index, text)
      }
    }

    function onDateClosed() {
      internalDateRange.value = []
      isPresent.value = false
    }

    function onPresentChange(event) {
      isPresent.value = event.target.checked
      if (datepicker.value && internalDateRange.value) {
        if (isPresent.value && internalDateRange.value[0])
          datepicker.value.updateInternalModelValue([internalDateRange.value[0], new Date()])
        else if (internalDateRange.value[0])
          datepicker.value.updateInternalModelValue([internalDateRange.value[0]])
      }
    }

    return {
      isToolEnabled,
      isMobileScreen,
      root,
      width,
      isMobileDatePicker,
      editor,
      toolbarId,
      isToolbarLoading,
      toolbarVisible,
      linkTooltip,
      linkEdit,
      linkTooltipVisible,
      linkEditVisible,
      linkTooltipStyle,
      linkEditStyle,
      selectedText,
      chatGPTId,
      chatGPTEdit,
      chatGPTEditVisible,
      selectedAnchor,
      draftLink,
      isValidDraftLink,
      link,
      datepicker,
      internalDateRange,
      isPresent,
      content,
      tooltipText,
      onFocus,
      onBlur,
      onClear,
      onLinkChange,
      closeLinkEdit,
      openLinkEdit,
      removeLink,
      resetLink,
      onEditorChange,
      onChatGPTClick,
      onMouseOver,
      onMouseOut,
      formatDate,
      toggleDatePicker,
      onInternalDateChange,
      onDateChange,
      onDateClosed,
      onPresentChange,
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
      v-if="enable && toolbarVisible && !isToolbarLoading && content !== '<p><br></p>'"
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
        <div
          v-if="chatgptEnable || datepickerEnable"
          class="flex items-center"
        >
          <Tooltip
            v-if="chatgptEnable"
            small
            placement="right"
            :text="tooltipText"
          >
            <button
              class="disabled:text-blacks-40"
              :class="[
                isMobileScreen ? 'btn-icon-32' : 'btn-icon-24',
                {
                  '!hover:bg-transparent': !selectedText
                }
              ]"
              value="chatgpt"
              :disabled="!selectedText"
              @mouseover="(e) => onMouseOver(e, 'chatgpt')"
              @mouseout="onMouseOut"
              @click="onChatGPTClick"
            >
              <span class="i-custom:chatgpt" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
            </button>
          </Tooltip>
          <Tooltip
            v-if="datepickerEnable"
            small
            placement="right"
            text="Date Picker"
          >
            <button
              :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'"
              @click="toggleDatePicker"
            >
              <span class="i-custom:datepicker" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
            </button>
          </Tooltip>
          <div class="h-5 mx-2 border-l border-blacks-20" />
        </div>
        <div class="flex justify-center items-center gap-3">
          <button v-if="isToolEnabled('list-bullet')" class="ql-list" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'" value="bullet">
            <span class="i-custom:list-bullet" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
          </button>
          <button v-if="isToolEnabled('list-number')" class="ql-list" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'" value="ordered">
            <span class="i-custom:list-number" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
          </button>
          <button v-if="isToolEnabled('indent')" class="ql-indent" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'" value="+1">
            <span class="i-custom:indent" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
          </button>
          <button v-if="isToolEnabled('unindent')" class="ql-indent" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'" value="-1">
            <span class="i-custom:unindent" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
          </button>
          <button v-if="isToolEnabled('bold')" class="ql-bold" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'">
            <span class="i-custom:bold" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
          </button>
          <button v-if="isToolEnabled('italic')" class="ql-italic" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'">
            <span class="i-custom:italic" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
          </button>
          <button v-if="isToolEnabled('highlight')" class="ql-background" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'">
            <span class="i-origin:highlight" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
          </button>
          <button v-if="isToolEnabled('link') && showLinkTool" class="ql-link" :class="isMobileScreen ? 'btn-icon-32' : 'btn-icon-24'">
            <span class="i-custom:link" :class="isMobileScreen ? 'w-6 h-6' : 'w-4.5 h-4.5'" />
          </button>
        </div>
      </div>
    </div>

    <ChatGPTModal
      :id="chatGPTId"
      ref="chatGPTEdit"
      :visible="chatGPTEditVisible"
      :text="selectedText"
      :question-options="chatgptQuestionOptions"
      class="absolute left-0 right-0 mt-2 z-20"
      @close="chatGPTEditVisible = false"
    />

    <VueDatePicker
      ref="datepicker"
      range
      month-picker
      multi-calendars
      hide-input-icon
      input-class-name="!h-0 !overflow-hidden"
      :auto-position="false"
      :menu-class-name="isMobileDatePicker ? 'dp-custom-menu' : ''"
      :clearable="false"
      :format="formatDate"
      :preview-format="formatDate"
      :enable-time-picker="false"
      :max-date="new Date()"
      @internal-model-change="onInternalDateChange"
      @update:model-value="onDateChange"
      @closed="onDateClosed"
    >
      <template #trigger />
      <template #action-row="{ internalModelValue, selectDate, closePicker }">
        <div class="flex-1">
          <div class="flex items-center">
            <input
              id="isPresent"
              type="checkbox"
              class="w-5 h-5 accent-blacks-70"
              :checked="isPresent"
              @input="onPresentChange"
            >
            <label
              for="isPresent"
              class="paragraph text-blacks-100 ml-3"
              :style="{ 'line-height': '20px'}"
            >
              Present
            </label>
          </div>
          <div
            class="mt-4"
            :class="isMobileDatePicker ? '' : 'flex justify-between items-center'"
          >
            <p class="min-h-[22px] paragraph text-blacks-100">
              {{ formatDate(internalModelValue) }}
            </p>
            <div
              class="flex items-center gap-4"
              :class="isMobileDatePicker ? 'justify-center mt-4' : 'justify-end'"
            >
              <button class="px-3 py-2 h-auto rounded-md btn-secondary" @click="closePicker">
                Cancel
              </button>
              <button class="px-3 py-2 h-auto rounded-md btn-primary" @click="selectDate">
                Select
              </button>
            </div>
          </div>
        </div>
      </template>
    </VueDatePicker>

    <div
      v-if="toolbarVisible && linkTooltipVisible && !linkEditVisible"
      ref="linkTooltip"
      class="absolute z-20 flex justify-between px-3 py-2 bg-white border-1 border-black rounded-xl shadow-custom"
      :style="linkTooltipStyle"
    >
      <a
        class="paragraph text-blacks-100 truncate"
        target="_blank"
        :href="link"
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
      <div class="fix-margin-bottom" style="top: 100%; bottom: 0; left: 0;" />
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
          :class="{'opacity-0': !isValidDraftLink}"
          @click="onLinkChange"
        >
          <span class="i-custom:ok w-6 h-6 text-blacks-40 sm:hover:text-blacks-70" />
        </button>
      </div>
      <div class="mt-3 flex justify-between items-center">
        <div>
          <p
            v-if="draftLink && !isValidDraftLink"
            class="note text-warning"
          >
            It doesn't look quite right.
          </p>
        </div>
        <button
          v-if="link"
          class="note text-blacks-40 sm:hover:text-blacks-70 transition-[color] duration-300"
          @click="removeLink"
        >
          Remove Link
        </button>
      </div>
      <div class="fix-margin-bottom" style="top: 100%; bottom: 0; left: 0;" />
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
  @apply flex justify-center items-center absolute top-0 left-0 right-0 z-1 h-12 p-2 m-[1px] bg-white rounded-t-xl sm:h-10;
  transition: visibility 0.15s linear, opacity 0.15s linear;
}
.toolbar-button-group {
  @apply flex items-center;
  overflow-x: scroll;
  overflow-y: hidden;
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

.dp__theme_light {
  --dp-primary-color: var(--primary-color);
  margin-bottom: 32px;
}
.dp-custom-menu .dp__flex_display {
  display: flex;
  flex-direction: column;
}
</style>
