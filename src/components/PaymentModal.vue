<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  toggle: () => void
}>()

const paymentVisible = ref<boolean>(false)

function togglePayment() {
  paymentVisible.value = !paymentVisible.value
}

function pay() {
  const stripeUrl: string = import.meta.env.VITE_STRIPE_URL as string
  if (stripeUrl) {
    window.open(stripeUrl)
    props.toggle()
  }
}
</script>

<template>
  <Modal
    class="select-none"
    @close="toggle"
  >
    <div class="flex justify-center items-center py-8 mt-3 bg-primary-10">
      <span class="i-origin:cv-icream w-[200px] h-[60px]" />
    </div>

    <div v-if="paymentVisible" class="mt-8">
      <div class="flex justify-between items-baseline">
        <p class="leading text-blacks-70">
          Your support
        </p>
        <p class="heading1 text-primary-100">
          £3
        </p>
      </div>
      <div class="mt-8">
        <button
          class="w-full max-w-[300px] flex justify-center items-center px-4 py-[7px] mx-auto bg-payment rounded-[32px]"
          @click="pay"
        >
          <span class="paragraph text-blacks-100">Pay with</span>
          <span class="i-origin:stripe w-16 h-8" />
        </button>
        <p class="max-w-[312px] note text-center text-blacks-70 mx-auto mt-3">
          You will be redirected to Stripe to complete your payment securely.
        </p>
      </div>
    </div>

    <div v-else class="text-center mt-8">
      <div>
        <p class="leading text-primary-100">
          We appreciate your support
        </p>
        <p class="heading1 text-primary-100">
          £3
        </p>
        <p class="paragraph text-blacks-70">
          to buy us a coffee and support us
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
          class="sm:flex-1 btn-primary px-8 flex-grow flex-shrink-0"
          @click="togglePayment"
        >
          <span class="subleading">
            Support us
          </span>
        </button>
      </div>
    </div>

    <div class="mt-8">
      <div class="flex">
        <span class="i-origin:done w-6 h-6" />
        <p class="paragraph text-blacks-100 ml-2">
          Enjoy the process of making CV
        </p>
      </div>
      <div class="flex mt-2">
        <span class="i-origin:done w-6 h-6" />
        <p class="paragraph text-blacks-100 ml-2">
          Be happy with our service
        </p>
      </div>
      <div class="flex mt-2">
        <span class="i-origin:done w-6 h-6" />
        <p class="paragraph text-blacks-100 ml-2">
          Support us to make better product
        </p>
      </div>
    </div>
  </Modal>
</template>
