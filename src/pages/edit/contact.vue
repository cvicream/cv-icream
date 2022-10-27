<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION } from '~/constants'

const user = useUserStore()
const { contact } = storeToRefs(user)

const isEditName = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)

watch(nameInput, () => {
  if (nameInput.value && isEditName.value) {
    nameInput.value.focus()
    nameInput.value.select()
  }
})

function onEditNameClick() {
  isEditName.value = !isEditName.value
}

function focusIn(index) {
  user.$patch((state) => {
    state.contact.list[index].isEditing = true
  })
}

function focusOut(index) {
  user.$patch((state) => {
    state.contact.list[index].isEditing = false
  })
}
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- TODO: icon should use i-custom-->
    <span class="i-origin:contact icon-32" />
    <div class="flex-1 h-6 overflow-hidden">
      <input
        v-if="isEditName"
        ref="nameInput"
        v-model="contact.name"
        type="text"
        class="w-full h-full leading text-blacks-100 bg-transparent outline-none"
        :title="contact.name"
        @keyup.enter="onEditNameClick"
      >
      <div
        v-else
        class="w-full h-full leading leading-6 text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent"
        :title="contact.name"
      >
        {{ contact.name }}
      </div>
    </div>

    <button class="flex-shrink-0" @click="onEditNameClick">
      <span
        class="icon-24"
        :class="isEditName ? 'i-custom:ok' : 'i-custom:edit'"
      />
    </button>
  </div>
  <div class="flex flex-col gap-6 pr-2 -mr-3 overflow-y-scroll custom-scrollbar">
    <p v-if="!contact.isShow" class="paragraph text-blacks-40">
      {{ HIDDEN_INFORMATION }}
    </p>
    <p v-else class="paragraph text-blacks-70">
      Tell people your contact info, so they can reach out to you immediately if they like your experience ; )
    </p>
    <div
      v-for="(item, index) in contact.list"
      :key="index"
      class="group"
      @focusin="() => focusIn(index)"
      @focusout="() => focusOut(index)"
    >
      <div class="flex justify-between items-center">
        <h3 v-if="contact.name" class="subleading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden">
          {{ contact.name }}
        </h3>
      </div>
      <div
        class="rounded-xl mt-3 px-4 py-6 flex flex-col gap-6 relative"
        :class="[(item.isShow ? 'bg-primary-10': 'bg-blacks-10')]"
      >
        <div class="flex flex-col gap-6">
          <div>
            <label class="block note text-blacks-70">Contact Info</label>
            <Editor
              v-model="item.paragraph"
              class-name="h-[130px] mt-1"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.contact.list[0].paragraph"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
