import { configureStore } from '@reduxjs/toolkit'
import userInfo from '../slice/UserSession/userSession'
export const store = configureStore({
  reducer: {
    user: userInfo,
  },
})