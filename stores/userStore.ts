import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserType = {
    email:string ,
    password: string,
    username: string,
}

type UserStore = {
    user: UserType | null,
    setUser: (user: UserType) => void,
    allUser: UserType[]
    addUser: (user: UserType) => void,
    removeUser: (user: UserType) => void,
}


const useStore = create(
    persist<UserStore>(
      (set) => ({
        user: null,
        setUser: (user: UserType) => set(() => ({user})),
        allUser: [],
        addUser: (user: UserType) => set((state) => ({allUser: [...state.allUser, user]})),
        removeUser: (user: UserType) => set((state) => ({allUser: state.allUser.filter((value => value.email !== user.email))})),

      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
  