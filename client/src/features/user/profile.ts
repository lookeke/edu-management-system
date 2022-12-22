import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

/**
 * @since 15/12/2022下午7:05
 * role 角色, 0: 管理员, 1: 教师, 2: 学生, 3: 访客
 *
 * name 用户名
 *
 * id 用户标识
 *  */
export type Profile = {
	role: number
	name: string
	id: string
}

const initialState: { value: Profile } = {
	value: {
		role: 4,
		name: '',
		id: '',
	},
}

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {

		/**
		 * @description 更新个人信息
		 * @since 15/12/2022下午7:12
		 * @param state 状态
		 * @param payload { Profile } 修改的内容
		 * @return 更新initialState的全部内容
		 *  */
		updateUserInfo: (state, { payload }: PayloadAction<Profile>) => {
			state.value = { ...payload }
		},

		/**
		 * @description 替换role内容
		 * @since 15/12/2022下午7:13
		 * @param state 状态
		 * @param payload { number } 角色权限
		 * @return 更新角色权限
		 *  */
		toggleRole: (state, { payload }: PayloadAction<number>) => {
			state.value.role = payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { updateUserInfo, toggleRole } = profileSlice.actions

export default profileSlice.reducer
