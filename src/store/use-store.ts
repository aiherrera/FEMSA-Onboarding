import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

import { generateSelectorHooks } from './generators/generate-selector-hooks'

type State = {
  isOpen: boolean
}

type Action = {
  toggle: (value: boolean) => void
}

const useStoreBase = create<State & Action>()(set => ({
  isOpen: false,
  toggle: value => set(() => ({ isOpen: value })),
}))

export const useStore = generateSelectorHooks(useStoreBase)

if (process.env.NODE_ENV === 'development') {
  console.log('development')
  mountStoreDevtool('Store', useStore)
}
