import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type Route = {
	router: {
		items: {
			path: string
			label: string
		}[]
		role: number | null
	}
}

const initialState: { value: Route } = {
	value: {
		router: {
			items: [],
			role: null,
		},
	},
}

export const routerSlice = createSlice({
	name: 'router',
	initialState,
	reducers: {
		createRouter: (state, { payload }: PayloadAction<Route>) => {
			state.value.router.items = [...payload.router.items]
		},
	},
})

export const { createRouter } = routerSlice.actions
export default routerSlice.reducer
