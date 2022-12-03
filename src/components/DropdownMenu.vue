<script lang="ts">
import { mapActions, mapState, mapStores } from 'pinia'
import { useToolbarStore } from '~/stores/toolbar'

export default {
  props: {
    id: String,
    label: String,
    icon: String,
    tooltip: String,
  },
  setup() {},
  computed: {
    ...mapStores(useToolbarStore),
    ...mapState(useToolbarStore, ['dropdownMenu']),
  },
  methods: {
    ...mapActions(useToolbarStore, ['toggle']),
  },
}
</script>

<template>
  <div class="">
    <Tooltip
      placement="top"
      :text="tooltip"
    >
      <div class="btn-toolbar w-8 h-8">
        <button
          class="w-8 h-8"
          :class="icon"
          @click.stop="toggle(id)"
        />
      </div>
    </Tooltip>
    <div v-if="dropdownMenu[id]" class="w-[232px] h-[168px] bg-white shadow-custom rounded-[20px] px-2 py-4 absolute left-0 bottom-[72px]">
      <div class="flex px-2 justify-between items-center">
        <div class="flex gap-2 items-center">
          <span
            class="w-8 h-8"
            :class="icon"
          />
          <label class="leading text-blacks-100">{{ label }}</label>
        </div>
        <span
          class="i-custom:cancel icon-24 cursor-pointer"
          @click.stop="toggle(id)"
        />
      </div>
      <div class="mt-4 flex flex-wrap gap-x-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
