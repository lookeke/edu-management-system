export type IUser = {
	userId: string
	username: string
	password: string
	role: number
}

export type IUserError = {
	status: number,
	msg: string,
}
