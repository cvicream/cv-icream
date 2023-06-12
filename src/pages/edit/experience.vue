<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION, TEMPLATE_LIST_ITEM } from '~/constants'

const user = useUserStore()
const { experience } = storeToRefs(user)

const isEditName = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)
const componentKey = ref(0) // force Editor component to re-render
const deleteBlockVisible = ref(false)
const deleteIdx = ref(0)

function forceRerender() {
  componentKey.value += 1
}

watch(nameInput, () => {
  if (nameInput.value && isEditName.value) {
    nameInput.value.focus()
    nameInput.value.select()
  }
})

function focusIn(index) {
  user.$patch((state) => {
    state.experience.list[index].isEditing = true
  })
  document.querySelector(`#cv-preview #experience-${index}`)?.scrollIntoView({ behavior: 'smooth' })
}

function focusOut(index) {
  user.$patch((state) => {
    state.experience.list[index].isEditing = false
  })
}

function addItem() {
  user.$patch((state) => {
    const newItem = JSON.parse(JSON.stringify(TEMPLATE_LIST_ITEM))
    state.experience.list.push(newItem)
  })
}

function toggleCollapseItem(index: number) {
  user.$patch((state) => {
    state.experience.list[index].isCollapsed = !state.experience.list[index].isCollapsed
  })
}

function toggleShowItem(index: number) {
  user.$patch((state) => {
    state.experience.list[index].isShow = !state.experience.list[index].isShow
  })
}

function duplicateItem(index: number) {
  user.$patch((state) => {
    state.experience.list[index].isEditing = false
    const currentItem = JSON.parse(JSON.stringify(state.experience.list[index]))
    state.experience.list.splice(index, 0, currentItem)
  })
  forceRerender()
}

function deleteItem(index: number) {
  if (user.experience.list.length <= 1) return

  user.$patch((state) => {
    state.experience.list.splice(index, 1)
  })
  forceRerender()
}

function toggleDeleteBlockModal() {
  deleteBlockVisible.value = !deleteBlockVisible.value
}

function showDeleteBlockMessage(index: number) {
  toggleDeleteBlockModal()
  deleteIdx.value = index
}

function deleteBlock(index: number) {
  toggleDeleteBlockModal()
  deleteItem(index)
}

</script>

<template>
  <Title category="experience" has-toggle-btn />
  <div class="flex-grow flex flex-col gap-6 pr-2 -mr-3 overflow-y-auto custom-scrollbar last-child-pb-4">
    <p v-if="!experience.isShow" class="paragraph text-blacks-40">
      {{ HIDDEN_INFORMATION }}
    </p>
    <p v-else class="paragraph text-blacks-70">
      Tell people more about your work experiences. Share more insights to impress you future employers!
    </p>
    <div
      v-for="(item, index) in experience.list"
      :key="componentKey + '-' + index"
      class="group"
      @focusin="() => focusIn(index)"
      @focusout="() => focusOut(index)"
    >
      <div class="flex justify-between items-center">
        <div class="flex gap-1 overflow-hidden">
          <h3 v-if="experience.name" class="subleading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden">
            {{ experience.name }}
          </h3>
          <span class="subleading text-blacks-100">{{ index + 1 }}</span>
        </div>
        <div
          class="invisible flex items-center gap-3 ml-3"
          :class="{ 'group-hover:visible': experience.isShow }"
        >
          <button v-if="experience.list.length > 1" @click="toggleShowItem(index)">
            <span
              class="icon-24"
              :class="item.isShow ? 'i-custom:show' : 'i-custom:hide'"
            />
          </button>
          <button @click="duplicateItem(index)">
            <span class="i-custom:variant icon-24" />
          </button>
          <button v-if="experience.list.length > 1" @click="showDeleteBlockMessage(index)">
            <span class="i-custom:delete icon-24" />
          </button>
        </div>
      </div>
      <div
        class="rounded-xl mt-3 px-4 py-6 flex flex-col gap-6 relative"
        :class="[(item.isShow ? 'bg-primary-10': 'bg-blacks-10')]"
      >
        <button
          class="absolute top-4 right-4"
          @click.prevent="toggleCollapseItem(index)"
        >
          <span
            class="icon-24"
            :class="item.isCollapsed ? 'i-origin:open' : 'i-origin:close'"
          />
        </button>
        <div>
          <label class="block note text-blacks-70">Title</label>
          <Editor
            v-model="item.title"
            class-name="h-[46px] mt-1"
            :enable="item.isShow"
            :placeholder="DEFAULT_TEMPLATE.experience.list[0].title"
          />
        </div>
        <div :class="item.isCollapsed ? 'hidden' : 'flex flex-col gap-6'">
          <div>
            <label class="block note text-blacks-70">Subtitle (align left)</label>
            <Editor
              v-model="item.subtitle1"
              class-name="h-[46px] mt-1"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.experience.list[0].subtitle1"
            />
          </div>
          <div>
            <label class="block note text-blacks-70">Subtitle (align right)</label>
            <Editor
              v-model="item.subtitle2"
              class-name="h-[46px] mt-1"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.experience.list[0].subtitle2"
            />
          </div>
          <div>
            <label class="block note text-blacks-70">Description</label>
            <Editor
              v-model="item.paragraph"
              class-name="h-[130px] mt-1"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.experience.list[0].paragraph"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="experience.isShow"
      class="w-full rounded-xl text-blacks-40 inline-flex justify-center items-center p-3 border-transparent border-1 group bg-primary-10 hover:border-primary-100"
      :disabled="!experience.isShow"
      @click="addItem"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40 flex-shrink-0"
        :class="experience.isShow && 'group-hover:text-blacks-70'"
      />
      <span class="subleading text-ellipsis whitespace-nowrap overflow-hidden" :class="experience.isShow && 'group-hover:text-blacks-100'">
        Add
      </span>
    </button>
  </div>
  <DeleteBlockModal
    :visible="deleteBlockVisible"
    :delete-idx="deleteIdx"
    :toggle="toggleDeleteBlockModal"
    :delete-item="deleteBlock"
  />
</template>

<route lang="yaml">
meta:
  layout: edit
</route>
