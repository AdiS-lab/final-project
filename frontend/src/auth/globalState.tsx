import { create } from "zustand";


type UserSession = {
    accessToken: string | undefined
  }

type UserSessionStore = {
    userSession: UserSession,
    setUserSession: (data: UserSession) => void
}

export const useUserSession = create<UserSessionStore>((set) => ({
  userSession: {
    accessToken: undefined
  },
  setUserSession: (data: UserSession) =>
    set(() => ({userSession: data})),
}));
