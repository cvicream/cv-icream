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
  <Title category="contact" />
  <div class="flex-grow flex flex-col pr-2 -mr-3 overflow-y-auto custom-scrollbar last-child-pb-4">
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
      <div class="flex justify-between items-center invisible">
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
              class-name="mt-1"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.contact.list[0].paragraph"
              :chatgpt-enable="false"
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
