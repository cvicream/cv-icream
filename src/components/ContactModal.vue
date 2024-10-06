<script setup lang="ts">
import { computed, ref } from 'vue'
import { validateEmail } from '~/utils'

defineProps<{
  title: string
  subtitle: string
  toggle: () => void
}>()

const content = ref('')
const name = ref('')
const email = ref('')
const loading = ref(false)
const isEmailFocus = ref(false)
const isSent = ref(false)

const isEmailValid = computed(() => {
  return validateEmail(email.value.trim())
})
const enable = computed(() => {
  return content.value && name.value && isEmailValid.value && !loading.value
})

function reset() {
  name.value = ''
  email.value = ''
  content.value = ''
}

async function sendFeedback() {
  if (loading.value) return

  loading.value = true
  try {
    const url = 'https://script.google.com/macros/s/AKfycbzoDaaxPWVOgHuUAMr0uYSmiANj12Enk01f008NyVnSRLzbr_PEmLl6b7g9r_3a6r-U/exec'
    await fetch(`${url}?${new URLSearchParams({
      name: name.value.trim(),
      email: email.value.trim(),
      content: content.value,
      star: '',
    })}`)

    reset()
    isSent.value = true
  }
  catch (error) {
    console.error(error)
  }
  loading.value = false
}
</script>

<template>
  <Modal
    :title="isSent ? '' : title"
    :subtitle="isSent ? '' : subtitle"
    subtitle-style="margin-top: 0;"
    @close="toggle"
  >
    <div>
      <div class="mt-8">
        <textarea
          v-model="content"
          placeholder="Share your feedback here..."
          class="h-[130px] form-textarea bg-primary-10 custom-scrollbar"
        />
      </div>

      <div class="mt-5">
        <label class="block note text-blacks-70">Your Contact Info</label>
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
          @focus="isEmailFocus = true"
          @blur="isEmailFocus = false"
        >
        <p
          v-if="email && !isEmailFocus && !isEmailValid"
          class="note text-warning mt-2"
        >
          It doesn't look quite right.
        </p>
      </div>

      <div class="flex flex-col gap-5 sm:gap-6 mt-8 sm:flex-row sm:justify-between">
        <button
          class="sm:flex-1 btn-secondary px-8 flex-shrink-0"
          @click="toggle"
        >
          <span class="subleading">
            Next Time
          </span>
        </button>
        <button
          id="send-feedback"
          class="sm:flex-1 btn-primary px-8 flex-grow flex-shrink-0"
          :class="{ 'text-blacks-40 bg-blacks-10': !enable}"
          :disabled="!enable"
          @click="sendFeedback"
        >
          <span class="subleading">
            Send
          </span>
        </button>
      </div>
    </div>
  </Modal>
</template>
