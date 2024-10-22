<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const { user: authUser } = storeToRefs(auth)
const firstName = ref(authUser.value?.firstName)
const lastName = ref(authUser.value?.lastName)
const email = ref(authUser.value?.email)
const showDeleteModal = ref(false)
const showLogoutModal = ref(false)

const isGoogle = computed(() => authUser?.value?.email.endsWith('@gmail.com'))

const hasChanged = computed(() => {
  if (!authUser.value)
    return false
  return firstName?.value !== authUser.value.firstName
  || lastName?.value !== authUser.value.lastName
  || email?.value !== authUser.value.email
})

async function onSave() {
  await auth.updateUser({
    ...authUser.value!,
    firstName: firstName?.value ?? '',
    lastName: lastName?.value ?? '',
    email: email?.value ?? '',
  })
}

async function onDelete() {
  await auth.deleteUser()
  logout()
}

function openDeleteModal() {
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
}

function openLogoutModal() {
  showLogoutModal.value = true
}

function closeLogoutModal() {
  showLogoutModal.value = false
}

function logout() {
  auth.logout()
  router.push('/sign-in')
}

</script>

<template>
  <div class="flex flex-col items-center">
    <div class="w-[358px] h-[851px] md:w-[700px] md:h-[730px] mt-8 bg-primary-5 rounded-6 p-8 gap-8 flex flex-col relative">
      <button class="w-6 h-6 float-right absolute right-5 top-5" @click="router.push('/dashboard')">
        <span class="i-custom:cancel icon-24" />
      </button>
      <div class="leading">
        Your Account
      </div>
      <Avatar
        format="base64"
        class="!w-25 !h-25"
        :src="authUser?.avatar"
      />
      <div class="flex flex-col sm:flex-row gap-6">
        <Input v-model="firstName" name="first-name" label="First Name" />
        <Input v-model="lastName" name="last-name" label="Last Name" />
      </div>
      <div class="-mt-2">
        <Input v-model="email" name="email" label="Email" :disabled="true" />
        <div v-if="isGoogle" class="note text-blacks-40 mt-1">
          You're currently using your Google account to log in.
        </div>
      </div>
      <div class="flex flex-col sm:flex-row justify-end gap-3 sm:gap-5 sm:mt-8">
        <button
          class="btn-secondary w-full sm:w-[137px]"
          @click="router.push('/dashboard')"
        >
          <span class="subleading">Cancel</span>
        </button>
        <button
          :disabled="!hasChanged"
          class="btn-primary w-full sm:w-[137px]"
          :class="!hasChanged && 'text-blacks-40 bg-blacks-10'"
          @click="() => onSave()"
        >
          <span class="subleading">Save</span>
        </button>
      </div>
      <div class="width-[100%] border-t-1 border-blacks-10 " />
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <a class="link/med text-warning" @click="openLogoutModal">
            Log out Account
          </a>
          <div class="note text-blacks-60">
            Temporarily logged out. You can sign back in anytime to restore access.
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <a class="link/med text-warning" @click="openDeleteModal">
            Delete Account
          </a>
          <div class="note text-blacks-60">
            Permanently delete your account and all of your content.
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal
    v-show="showDeleteModal"
    title="Are You Sure?"
    subtitle="All information saved in this account will be erased forever and cannot be undone."
    subtitle-style="margin-top: 4;"
    @close="closeDeleteModal"
  >
    <div class="flex flex-col gap-6 mt-8 sm:flex-row sm:justify-between">
      <button
        class="btn-secondary px-12 flex-shrink-0"
        @click="closeDeleteModal"
      >
        <span class="subleading">Cancel</span>
      </button>
      <button
        class="btn-primary px-6 flex-grow flex-shrink-0 text-white bg-primary-100"
        @click="onDelete"
      >
        <span class="subleading">Delete Account</span>
      </button>
    </div>
  </Modal>
  <Modal
    v-show="showLogoutModal"
    title="You’re about to log out."
    subtitle="You can log back in anytime to restore access."
    subtitle-style="margin-top: 4;"
    @close="closeLogoutModal"
  >
    <div class="flex flex-col gap-6 mt-8 sm:flex-row sm:justify-between">
      <button
        class="btn-secondary px-12 flex-shrink-0"
        @click="closeLogoutModal"
      >
        <span class="subleading">Cancel</span>
      </button>
      <button
        class="btn-primary px-6 flex-grow flex-shrink-0 text-white bg-primary-100"
        @click="logout"
      >
        <span class="subleading">Log out</span>
      </button>
    </div>
  </Modal>
</template>

<style lang="scss">
#first-name, #last-name, #email {
  &:focus-visible, &:hover {
    outline: 1px solid;
    outline-color: var(--black-100);
  }
}
</style>

<route lang="yaml">
meta:
  layout: dashboard
  requiresAuth: true
</route>
