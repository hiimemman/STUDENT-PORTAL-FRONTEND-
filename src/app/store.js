import { configureStore } from '@reduxjs/toolkit'
import userInfo from '../slice/UserSession/userSession'
import menuState from '../slice/MenuSlice/MenuState'
export const store = configureStore({
  reducer: {
    user: userInfo,
    isOpen: menuState,
  },
})