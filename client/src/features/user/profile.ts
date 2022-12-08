import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type Profile = {
	role: number | null
	name: string
	id: string
}

const initialState: { value: Profile } = {
	value: {
		role: null,
		name: '',
		id: '',
	},
}

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		updateUserInfo: (state, { payload }: PayloadAction<Profile>) => {
			state.value = { ...payload }
		},
	},
})

// Action creators are generated for each case reducer function
export const { updateUserInfo } = profileSlice.actions

export default profileSlice.reducer
