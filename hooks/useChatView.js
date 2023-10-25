import { create } from 'zustand'

export const useChatView = create((set) => ({
  userId: null,
  setUserChat: (id) => set(() => ({ userId: id }))
}))