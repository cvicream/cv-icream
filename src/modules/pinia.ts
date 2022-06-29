import { createPinia } from 'pinia'
import type { UserModule } from '~/types'
import { getStorage, isEditing, isSaved, setStorage } from '~/utils'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ app }) => {
  const pinia = createPinia()

  if (isEditing() && isSaved()) {
    const pathname = window.location.pathname
    if (pathname && pathname.includes('/edit')) {
      // when click reload at edit page
      pinia.state.value = getStorage()
    }
  }

  watch(
    pinia.state,
    (state) => {
      // persist the whole state to the local storage whenever it
      if (isEditing() && isSaved())
        setStorage(state)
    },
    { deep: true },
  )
  app.use(pinia)
}
