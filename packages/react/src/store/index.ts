import { create } from 'zustand'

const store = create(set => ({
  count: 1,
  isVisible: false,
  src: "http://localhost:5172/",
  setVisable: (value: boolean) => set((state: { isVisible: boolean }) => ({ isVisible: value  })),
  setSrc: (value: string) => set((state: {src: string}) => ({src: value}))
}))


export {store}