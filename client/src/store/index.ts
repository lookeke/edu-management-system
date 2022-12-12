import { configureStore } from '@reduxjs/toolkit'

import routerReducer from '@/features/router'
import profileReducer from '@/features/user/profile'

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		router: routerReducer
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
