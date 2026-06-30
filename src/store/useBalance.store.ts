import { create } from 'zustand'
import type {IUser} from "@/shared/zod-schemas/user.schemas.ts";

type Store = {
    balance: IUser['balance']
    inc: () => void
}

const useStore = create<Store>()((set) => ({
    balance: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
}))

export {useStore}