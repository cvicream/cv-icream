<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const { user: authUser } = storeToRefs(auth)
const firstName = ref(authUser.value?.firstName)
const lastName = ref(authUser.value?.lastName)
const email = ref(authUser.value?.email)

const isGoogle = computed(() => authUser?.value?.email.endsWith('@gmail.com'))

const hasChanged = computed(() => {
  if (!authUser.value)
    return false
  return firstName?.value !== authUser.value.firstName
  || lastName?.value !== authUser.value.lastName
  || email?.value !== authUser.value.email
})

function onSave() {
  console.log(firstName?.value, 'firstName')
  console.log(lastName?.value, 'lastName')
  console.log(email?.value, 'email')
}

function deleteAccount() {

}

function logout() {
  auth.logout()
  router.push('/sign-in')
}

</script>

<template>
  <div class="w-[700px] h-[730px] mt-[32px] bg-primary-5 rounded-[24px] p-[32px] gap-[32px] flex flex-col relative">
    <button class="w-6 h-6 float-right absolute right-[26px] top-[26px]" @click="router.push('/dashboard')">
      <span
        class="i-custom:cancel icon-24"
      />
    </button>
    <div class="leading">
      Your Account
    </div>
    <img width="100" height="100" class="rounded-full" :src="authUser?.avatar ?? ''">
    <div class="flex gap-[24px]">
      <Input v-model="firstName" label="First Name" />
      <Input v-model="lastName" label="Last Name" />
    </div>
    <div>
      <Input v-model="email" label="Email" :disabled="true" />
      <div v-if="isGoogle" class="note text-blacks-40 mt-[4px]">
        You're currently using your Google account to log in.
      </div>
    </div>
    <div class="flex justify-end gap-[20px] mt-[32px]">
      <button
        class="btn-secondary w-[137px]"
        @click="router.push('/dashboard')"
      >
        <span class="subleading">Cancel</span>
      </button>
      <button
        :disabled="!hasChanged"
        class="btn-primary w-[137px]"
        :class="!hasChanged && 'text-blacks-40 bg-blacks-10'"
        @click="() => onSave()"
      >
        <span class="subleading">Save</span>
      </button>
    </div>
    <div class="width-[100%] border border-blacks-10 " />
    <div class="flex flex-col gap-[24px]">
      <div>
        <a class="text-primary-100 border-b border-primary-100 cursor-pointer" @click="logout">
          Log out Account
        </a>
        <div class="note text-blacks-60">
          Temporarily suspend your account. You can access it again anytime by signing back in.
        </div>
      </div>
      <div>
        <a class="text-primary-100 border-b border-primary-100 cursor-pointer" @click="deleteAccount">
          Delete Account
        </a>
        <div class="note text-blacks-60">
          Permanently delete your account and all of your content.
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  /* button {
    &:disabled {
      color:
    }
  } */
</style>

<route lang="yaml">
meta:
  layout: account
</route>
