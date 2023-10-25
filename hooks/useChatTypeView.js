import { create } from 'zustand'

export const useChatTypeView = create((set) => ({
  id: null,
  type: '',
  setChatTypeId: (id, type) => set(() => ({ id: id, type: type }))
}))