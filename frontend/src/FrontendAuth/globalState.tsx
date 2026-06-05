import { create } from "zustand";


type UserSession = {
    accessToken: string | null
  }

type UserSessionStore = {
    userSession: UserSession,
    setUserSession: (data: UserSession) => void
}

export const useUserSession = create<UserSessionStore>((set) => ({
  userSession: {
    accessToken: null
  },
  setUserSession: (data: UserSession) =>
    set(() => ({userSession: data})),
}));
