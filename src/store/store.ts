import { create } from 'zustand'

const useStore = create((set) => ({
  token: "",
  addToken: (token:string) => set(() => ({  token })),
  removeToken: () => set({ token: "" }),
  
}))

export default useStore;
 