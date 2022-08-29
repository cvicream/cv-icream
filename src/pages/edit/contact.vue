<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION } from '~/constants'

const user = useUserStore()
const { contact } = storeToRefs(user)

const isEditName = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)

function onEditNameClick() {
  isEditName.value = !isEditName.value
  if (nameInput.value) {
    if (isEditName.value) {
      nameInput.value.disabled = false
      nameInput.value.focus()
      nameInput.value.select()
    }
    else {
      nameInput.value.disabled = true
    }
  }
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
  <div class="flex justify-between items-center">
    <h2 class="flex items-center">
      <!-- TODO: icon should use i-custom-->
      <span class="i-origin:contact icon-32" />
      <input
        ref="nameInput"
        v-model="contact.name"
        type="text"
        maxlength="15"
        class="max-w-[132px] h-6 leading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent outline-none ml-2"
        :title="contact.name"
        :disabled="!isEditName"
      >
      <button class="ml-1" @click="onEditNameClick">
        <span
          class="icon-24"
          :class="isEditName ? 'i-custom:ok' : 'i-custom:edit'"
        />
      </button>
    </h2>
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
        <div>
          <h3 v-if="contact.name" class="subleading text-blacks-100">
            {{ contact.name[0]?.toUpperCase() + contact.name.slice(1).toLowerCase() }}
          </h3>
        </div>
      </div>
      <div
        class="rounded-xl mt-3 px-4 py-6 flex flex-col gap-6 relative"
        :class="[(item.isShow ? 'bg-primary-10': 'bg-blacks-10')]"
      >
        <div class="flex flex-col gap-6">
          <div>
            <label class="note text-blacks-70">Contact Info</label>
            <Editor
              v-model="item.paragraph"
              class-name="h-[130px]"
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
