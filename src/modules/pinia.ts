import { createPinia } from 'pinia'
import type { UserModule } from '~/types'
import { getStorage, isEditing, setStorage } from '~/utils'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ app }) => {
  const pinia = createPinia()

  if (isEditing())
    pinia.state.value = getStorage()

  watch(
    pinia.state,
    (state) => {
      // persist the whole state to the local storage whenever it changes
      setStorage(state)
    },
    { deep: true },
  )
  app.use(pinia)
}
