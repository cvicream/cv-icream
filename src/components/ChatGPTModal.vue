<script setup lang="ts">
import { ref, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import axios from 'axios'
import { isMobileDevice, isSafari } from '~/utils'

const emit = defineEmits(['close'])

const props = defineProps<{
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
const resultVisible = ref(false)
const result = ref('')

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
    const res = await axios({
      method: 'POST',
      url: import.meta.env.VITE_CHATGPT_URL as string,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_CHATGPT_API_KEY}`,
      },
      data,
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
</script>

<template>
  <div
    v-if="visible"
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

    <div class="relative mt-4">
      <div
        class="px-4 py-3 bg-primary-10 flex justify-between items-center rounded-xl select-none"
        :class="[
          {
            'border-blacks-100': open,
            'cursor-pointer': !result,
          },
          loading ? '!text-blacks-70' : '!text-blacks-100'
        ]"
        :style="{
          'border-bottom-left-radius': result ? 0 : '12px',
          'border-bottom-right-radius': result ? 0 : '12px',
        }"
        @click="toggle"
      >
        <span v-if="question && !loading" class="paragraph text-blacks-100">{{ question }}</span>
        <span v-else-if="loading" class="paragraph text-blacks-40 loading">AI is writing</span>
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
      </div>

      <div v-if="open && !result" class="absolute left-[2px] right-[2px] top-[54px]">
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
          <button v-if="isSupported" @click="copy(result)">
            <span class="i-custom:variant icon-24" />
          </button>
        </div>
      </div>
    </div>

    <div class="fix-margin-bottom" style="top: 100%; left: 0;" />
  </div>
</template>

<style scope>
.loading::after {
  content: '';
  display: inline-block;
  animation: dotty steps(1, end) 2s infinite;
}

@keyframes dotty {
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
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
