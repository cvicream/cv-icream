<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { DEFAULT_TEMPLATE, HIDDEN_INFORMATION, TEMPLATE_LIST_ITEM } from '~/constants'

const user = useUserStore()
const { social } = storeToRefs(user)

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
    state.social.list[index].isEditing = true
  })
}

function focusOut(index) {
  user.$patch((state) => {
    state.social.list[index].isEditing = false
  })
}

function addItem() {
  user.$patch((state) => {
    const newItem = JSON.parse(JSON.stringify(TEMPLATE_LIST_ITEM))
    state.social.list.push(newItem)
  })
}

function toggleCollapseItem(index: number) {
  user.$patch((state) => {
    state.social.list[index].isCollapsed = !state.social.list[index].isCollapsed
  })
}

function toggleShowItem(index: number) {
  user.$patch((state) => {
    state.social.list[index].isShow = !state.social.list[index].isShow
  })
}

function duplicateItem(index: number) {
  user.$patch((state) => {
    state.social.list[index].isEditing = false
    const currentItem = JSON.parse(JSON.stringify(state.social.list[index]))
    state.social.list.splice(index, 0, currentItem)
  })
  forceRerender()
}

function deleteItem(index: number) {
  if (user.social.list.length <= 1) return

  user.$patch((state) => {
    state.social.list.splice(index, 1)
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
  <Title category="social" has-toggle-btn />
  <div class="flex-grow flex flex-col gap-6 pr-2 -mr-3 overflow-y-auto custom-scrollbar last-child-pb-4">
    <p v-if="!social.isShow" class="paragraph text-blacks-40">
      {{ HIDDEN_INFORMATION }}
    </p>
    <p v-else class="paragraph text-blacks-70">
      Share your social media platforms, such as LinkedIn profile, the portfolio of your work, or your own website.
    </p>
    <div
      v-for="(item, index) in social.list"
      :key="componentKey + '-' + index"
      class="group"
      @focusin="() => focusIn(index)"
      @focusout="() => focusOut(index)"
    >
      <div class="flex justify-between items-center">
        <div class="flex gap-1 overflow-hidden">
          <h3 v-if="social.name" class="subleading text-blacks-100 text-ellipsis whitespace-nowrap overflow-hidden">
            {{ social.name }}
          </h3>
          <span class="subleading text-blacks-100">{{ index + 1 }}</span>
        </div>
        <div
          class="invisible flex items-center gap-3 ml-3"
          :class="{ 'group-hover:visible': social.isShow }"
        >
          <button v-if="social.list.length > 1" @click="toggleShowItem(index)">
            <span
              class="icon-24"
              :class="item.isShow ? 'i-custom:show' : 'i-custom:hide'"
            />
          </button>
          <button @click="duplicateItem(index)">
            <span class="i-custom:variant icon-24" />
          </button>
          <button v-if="social.list.length > 1" @click="showDeleteBlockMessage(index)">
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
          <label class="block note text-blacks-70">Type</label>
          <Editor
            v-model="item.type"
            class-name="h-[46px] mt-1"
            :enable="item.isShow"
            :placeholder="DEFAULT_TEMPLATE.social.list[0].type"
            :is-single-line="true"
          />
        </div>
        <div :class="item.isCollapsed ? 'hidden' : 'flex flex-col gap-6'">
          <div>
            <label class="block note text-blacks-70">Link</label>
            <input
              v-model="item.link"
              type="search"
              class="form-input mt-1"
              :class="{'bg-blacks-5': !social.isShow}"
              :enable="item.isShow"
              :placeholder="DEFAULT_TEMPLATE.social.list[0].link"
              :is-single-line="true"
            >
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="social.isShow"
      class="w-full rounded-xl text-blacks-40 inline-flex justify-center items-center p-3 border-transparent border-1 group bg-primary-10 hover:border-primary-100"
      :disabled="!social.isShow"
      @click="addItem"
    >
      <span
        class="i-custom:add w-6 h-6 text-blacks-40 flex-shrink-0"
        :class="social.isShow && 'group-hover:text-blacks-70'"
      />
      <span class="subleading text-ellipsis whitespace-nowrap overflow-hidden" :class="social.isShow && 'group-hover:text-blacks-100'">
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
