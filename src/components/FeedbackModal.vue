<script setup lang="ts">
import { computed, ref } from 'vue'
import { validateEmail } from '~/utils'

const STAR_NUM = 5

const props = defineProps<{
  title: string
  subtitle: string
  toggle: () => void
  notify?: () => void
  pay?: () => void
}>()

const star = ref(0)
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
  return (content.value || star.value) && !loading.value
})

function handleStarClick(n: number) {
  if (n === 1 && star.value === 1) star.value = 0
  else if (n === star.value) star.value = star.value ? star.value - 1 : n
  else star.value = n
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
    const url = 'https://script.google.com/macros/s/AKfycbzoDaaxPWVOgHuUAMr0uYSmiANj12Enk01f008NyVnSRLzbr_PEmLl6b7g9r_3a6r-U/exec'
    await fetch(`${url}?${new URLSearchParams({
      name: name.value.trim(),
      email: email.value.trim(),
      content: content.value,
      star: star.value.toString(),
    })}`)

    if (!props.pay && props.notify) {
      props.toggle()
      props.notify()
    }

    reset()
    isSent.value = true
  }
  catch (error) {
    console.error(error)
  }
  loading.value = false
}

function togglePaymentModal() {
  props.pay && props.pay()
  props.toggle()
}
</script>

<template>
  <Modal
    :title="isSent ? '' : title"
    :subtitle="isSent ? '' : subtitle"
    subtitle-style="margin-top: 0;"
    @close="toggle"
  >
    <div v-if="isSent" class="select-none">
      <div class="flex justify-center items-center py-8 mt-3 bg-primary-10">
        <span class="i-origin:cv-icream w-[200px] h-[60px]" />
      </div>
      <div class="mt-8">
        <p class="heading2 text-primary-100 text-center">
          Thank you!
        </p>
        <p class="paragraph text-blacks-70 text-center mt-3">
          Your feedback has already been sent : )
        </p>
      </div>
      <div class="mt-8">
        <button
          class="w-full p-2 flex items-center bg-greens-10 rounded-xl"
          @click="togglePaymentModal"
        >
          <span class="i-custom:payment text-greens-100 w-6 h-6" />
          <span class="note text-blacks-100 ml-1">
            Support us with making better product
          </span>
        </button>
      </div>
    </div>
    <div v-else>
      <div class="flex gap-3 mt-6">
        <span
          v-for="n in STAR_NUM"
          :key="n"
          class="w-12 h-12 transition duration-200 ease-in-out"
          :class="star && n <= star ? 'i-custom:star-fill text-primary-100' : 'i-custom:star text-blacks-20'"
          @click="() => handleStarClick(n)"
        />
      </div>

      <div class="mt-8">
        <p class="note text-blacks-70">
          Let us know how we are doing : )
        </p>
        <textarea
          v-model="content"
          placeholder="Share your feedback here..."
          class="form-textarea bg-primary-10 custom-scrollbar mt-1 focus:h-[130px]"
          :class="content ? 'h-[130px]' : 'h-[50px]'"
        />
      </div>

      <div v-show="content" class="mt-5">
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
