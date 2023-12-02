<script setup lang="ts">
import { ref, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import axios from 'axios'
import { isMobileDevice, isSafari } from '~/utils'

const emit = defineEmits(['close'])

const props = defineProps<{
  id?: string
  visible?: boolean
  text?: string
}>()

const defaultQuestions = [
  {
    value: 'improve-writing',
    label: 'Improve writing',
  },
  {
    value: 'fix-spelling-grammar',
    label: 'Fix spelling & grammar',
  },
  {
    value: 'make-shorter',
    label: 'Make shorter',
  },
  {
    value: 'make-longer',
    label: 'Make longer',
  },
  {
    value: 'translate-into-english',
    label: 'Translate into English',
  },
]

const { isSupported, copy } = useClipboard()
const question = ref('')
const open = ref(false)
const loading = ref(false)
const abortController = ref<AbortController>()
const resultVisible = ref(false)
const result = ref('')
const notificationVisible = ref(false)

watch(() => props.visible, (newValue) => {
  if (!newValue)
    reset()
})

function closeModal() {
  emit('close')
}

function getOptionClass(index: number) {
  if (index === 0)
    return isSafari() || isMobileDevice() ? 'rounded-t-[11px]' : 'rounded-t-xl'
  else if (index === defaultQuestions.length - 1)
    return isSafari() || isMobileDevice() ? 'rounded-b-[11px]' : 'rounded-b-xl'
  return ''
}

function toggle() {
  if (loading.value) return
  open.value = !open.value
}

function reset() {
  question.value = ''
  result.value = ''
  resultVisible.value = false
}

function setQuestion(text: string) {
  question.value = text
  open.value = false
}

async function sendRequest() {
  loading.value = true
  resultVisible.value = false
  result.value = ''

  const data = {
    model: import.meta.env.VITE_CHATGPT_MODEL,
    messages: [
      {
        role: 'user',
        content: `Here is a paragraph: ${props.text}. Please ${question.value}.`,
      },
    ],
  }

  try {
    abortController.value = new AbortController()
    const signal = abortController.value.signal
    const res = await axios({
      method: 'POST',
      url: import.meta.env.VITE_CHATGPT_URL as string,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_CHATGPT_API_KEY}`,
      },
      data,
      signal,
    })
    if (res.data?.choices?.length) {
      result.value = res.data.choices[0].message?.content
      resultVisible.value = true
    }
  }
  catch (error) {
    console.error(error)
  }

  loading.value = false
}

function cancelRequest() {
  if (abortController.value)
    abortController.value.abort()

  loading.value = false
}

function copyToClipboard(val) {
  copy(val)
  notificationVisible.value = true
}
</script>

<template>
  <div
    v-if="visible"
    :id="id"
    class="bg-white p-4 rounded-[1.25rem] shadow-custom"
  >
    <div class="flex justify-between">
      <div class="flex gap-2 items-center">
        <div class="w-8 h-8 flex justify-center items-center">
          <span class="i-custom:chatgpt w-6 h-6 text-blacks-70" />
        </div>
        <span class="leading text-blacks-100">Write with AI</span>
      </div>
      <button @click="closeModal">
        <span class="i-custom:cancel w-5 h-5 text-blacks-40 sm:hover:text-blacks-70" />
      </button>
    </div>

    <div
      class="px-4 py-3 mt-4 bg-primary-10 border-1 flex justify-between items-center rounded-xl select-none"
      :class="[
        open ? 'border-blacks-100' : 'border-transparent',
        loading ? '!text-blacks-70' : '!text-blacks-100',
        {
          'hover:border-blacks-100 cursor-pointer': !loading && !result,
          '!border-transparent': result,
        },
      ]"
      :style="{
        'border-bottom-left-radius': result ? 0 : '12px',
        'border-bottom-right-radius': result ? 0 : '12px',
      }"
      @click="toggle"
    >
      <span v-if="question && !loading" class="paragraph text-blacks-100">{{ question }}</span>
      <span v-else-if="loading" class="paragraph text-blacks-40 typewriter" />
      <span v-else class="paragraph text-blacks-40">Ask AI...</span>

      <button
        v-if="text && question && !loading && !result"
        class="w-6 h-6"
        @click.stop="sendRequest"
      >
        <span
          class="i-custom:arrow-up-circle w-6 h-6 text-blacks-40"
          :class="{ 'sm:hover:text-blacks-70': !loading && !result }"
        />
      </button>
      <button
        v-if="loading"
        class="w-6 h-6"
        @click.stop="cancelRequest"
      >
        <span class="i-custom:pause w-6 h-6 text-blacks-40 sm:hover:text-blacks-70" />
      </button>
    </div>

    <div
      v-if="open && !result"
      class="mt-2"
    >
      <div
        class="bg-white rounded-xl overflow-hidden"
        :class="isSafari() || isMobileDevice() ? 'border-1 border-blacks-100' : 'outline outline-1 outline-blacks-100'"
      >
        <button
          v-for="(item, index) in defaultQuestions"
          :key="item.value"
          class="w-full h-[45px] flex justify-start items-center px-4 py-3 sm:hover:bg-primary-10"
          :class="getOptionClass(index)"
          @click="() => setQuestion(item.label)"
        >
          <span class="paragraph text-blacks-100">{{ item.label }}</span>
        </button>
      </div>
      <div class="fix-margin-bottom" style="top: 100%; left: 0;" />
    </div>

    <div
      v-if="resultVisible"
      class="bg-primary-10 rounded-bl-xl rounded-br-xl"
    >
      <div class="border-t border-blacks-10 mx-2" />
      <div class="px-3 py-4">
        <p class="note text-blacks-70">
          Here are the result from AI
        </p>
        <p class="paragraph text-blacks-70 bg-white rounded-xl p-3 mt-1">
          {{ result }}
        </p>
        <div class="flex justify-end gap-2 mt-3">
          <button @click="sendRequest">
            <span class="note icon-24">Regenerate</span>
          </button>
          <button @click="reset">
            <span class="i-custom:delete icon-24" />
          </button>
          <button v-if="isSupported" @click="copyToClipboard(result)">
            <span class="i-custom:variant icon-24" />
          </button>
        </div>
      </div>
    </div>

    <Notification
      v-if="notificationVisible"
      message="The result has been copied!"
      :visible="notificationVisible"
      :duration="2000"
      @close="notificationVisible = false"
    />

    <div class="fix-margin-bottom" style="top: 100%; left: 0;" />
  </div>
</template>

<style scope>
.typewriter::after {
  content: '';
  display: inline-block;
  animation: typing steps(1, end) 3s infinite;
}

@keyframes typing {
  0%   { content: ''; }
  5%   { content: 'A'; }
  10%  { content: 'AI'; }
  15%  { content: 'AI '; }
  20%  { content: 'AI i'; }
  25%  { content: 'AI is'; }
  30%  { content: 'AI is '; }
  35%  { content: 'AI is w'; }
  40%  { content: 'AI is wr'; }
  45%  { content: 'AI is wri'; }
  50%  { content: 'AI is writ'; }
  55%  { content: 'AI is writi'; }
  60%  { content: 'AI is writin'; }
  65%  { content: 'AI is writing'; }
  70%  { content: 'AI is writing.'; }
  75%  { content: 'AI is writing..'; }
  85%  { content: 'AI is writing...'; }
  100% { content: ''; }
}

.fix-margin-bottom {
  content: '';
  width: 100%;
  height: 32px;
  background-color: transparent;
  position: absolute;
  z-index: -1;
}
</style>
