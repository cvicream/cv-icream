import { createPinia } from 'pinia'
import _ from 'lodash'
import type { UserModule } from '~/types'
import { getStorage, hasStorage, isEditing, setStorage } from '~/utils'
import { useUndoStore } from '~/stores/undo'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ app }) => {
  const pinia = createPinia()

  if (hasStorage())
    pinia.state.value = getStorage()

  watch(
    pinia.state,
    (state) => {
      // persist the whole state to the local storage whenever it changes
      if (isEditing()) {
        // exclude `undo` and `redo`
        const savedState = _.cloneDeep(_.omit(state, ['undo', 'redo']))
        setStorage(savedState)

        console.log(state.user.action)
        if (['undo', 'redo'].includes(state.user.action)) { state.user.action = '' }
        else {
          const undoStore = useUndoStore()
          undoStore.push(savedState)
        }
      }
    },
    { deep: true },
  )
  app.use(pinia)
}
