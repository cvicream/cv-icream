<script setup lang="ts">
import { computed, ref } from 'vue'
import { validateEmail } from '~/utils'

const props = defineProps<{
  title: string
  subtitle: string
  visible: boolean
  toggle: () => void
}>()

const content = ref('')
const name = ref('')
const email = ref('')
const loading = ref(false)
const isEmailValid = ref(true)

const enable = computed(() => {
  return content.value && name.value && isEmailValid.value
})

function handleInputEmail() {
  isEmailValid.value = validateEmail(email.value)
}

function reset() {
  name.value = ''
  email.value = ''
  content.value = ''
}

async function sendFeedback() {
  if (loading.value) return

  loading.value = true
  try {
    const url = 'https://script.google.com/macros/s/AKfycbxq_a3TUrbsvWHxASqFqouHQ-12J2QQbYjvyumY4-DCc2d_Kb07pBAe_-NCuQ9t878Z/exec'
    await fetch(`${url}?${new URLSearchParams({
      name: name.value,
      email: email.value,
      content: content.value,
    })}`)
    props.toggle()
    reset()
  }
  catch (error) {
    console.error(error)
  }
  loading.value = false
}
</script>

<template>
  <Modal
    v-show="visible"
    :title="title"
    :subtitle="subtitle"
    subtitle-style="margin-top: 0;"
    @close="toggle"
  >
    <textarea
      v-model="content"
      placeholder="Share your feedback here..."
      class="form-textarea bg-primary-10 custom-scrollbar mt-8"
    />
    <div class="mt-6">
      <label class="note text-blacks-70">Your Contact Info</label>
      <input
        v-model="name"
        type="search"
        placeholder="Name"
        class="form-input bg-primary-10 mt-1"
      >
      <input
        v-model="email"
        type="search"
        placeholder="Email"
        class="form-input bg-primary-10 mt-3"
        @keyup.enter="handleInputEmail"
        @blur="handleInputEmail"
      >
      <p
        v-if="!isEmailValid"
        class="note text-warning mt-2"
      >
        It doesn't look quite right.
      </p>
    </div>
    <div class="flex flex-col gap-6 mt-8 sm:flex-row sm:justify-between">
      <button
        class="btn-secondary px-8 flex-shrink-0"
        @click="toggle"
      >
        <span class="subleading">
          Next Time
        </span>
      </button>
      <button
        class="btn-primary px-8 flex-grow flex-shrink-0"
        :class="{ 'text-blacks-40 bg-blacks-10': !enable}"
        :disabled="!enable"
        @click="sendFeedback"
      >
        <span class="subleading">
          Send
        </span>
      </button>
    </div>
  </Modal>
</template>
