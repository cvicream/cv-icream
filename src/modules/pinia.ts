import { createPinia } from 'pinia'
import _ from 'lodash'
import type { CV, UserModule } from '~/types'
import { getStorage, isEditing, setStorage } from '~/utils'
import { useAuthStore } from '~/stores/auth'
import { useCVStore } from '~/stores/cv'
import { useUndoStore } from '~/stores/undo'
import { useRedoStore } from '~/stores/redo'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ app }) => {
  const pinia = createPinia()
  const updateCV = _.debounce(async() => {
    const cvStore = useCVStore()
    const newCV: CV = cvStore.cv as CV
    const storage = getStorage()
    if (!_.isEqual(_.omit(storage, ['user.timestamp']), _.omit(JSON.parse(newCV.content), ['user.timestamp']))) {
      newCV.content = JSON.stringify(storage)
      await cvStore.update(newCV)
    }
  }, 4000)

  watch(
    pinia.state,
    (state) => {
      // persist the whole state to the local storage whenever it changes
      if (isEditing()) {
        // exclude `undo` and `redo`
        const savedState = _.cloneDeep(_.omit(state, ['undo', 'redo', 'auth', 'cv', 'notification']))
        const authStore = useAuthStore()
        const cvStore = useCVStore()
        const undoStore = useUndoStore()
        const redoStore = useRedoStore()
        const currentState = getStorage()

        if (!_.isEqual(savedState, currentState)) {
          setStorage(savedState)

          if (authStore.user && cvStore.cv)
            updateCV()
        }
        if (['undo', 'redo'].includes(state.user.action)) {
          state.user.action = ''
          if (redoStore.list.length === 1 && redoStore.maxRestore === 0)
            redoStore.updateMaxRestore(undoStore.list.length + redoStore.list.length)
        }
        else {
          undoStore.push(savedState)
          // new operation is added after undo operation, then reset undo buffer
          if (redoStore.maxRestore !== 0
              && (redoStore.list.length + undoStore.list.length) !== redoStore.maxRestore) {
            redoStore.reset()
            redoStore.updateMaxRestore(0)
          }
        }
      }
    },
    { deep: true },
  )
  app.use(pinia)
}
