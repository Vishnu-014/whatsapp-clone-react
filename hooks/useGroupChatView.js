import { create } from 'zustand'

export const useGroupChatView = create((set) => ({
  groupId: null,
  setGroupUserChat: (id) => set(() => ({ groupId: id }))
}))