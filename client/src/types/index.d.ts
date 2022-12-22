import { ReactNode } from 'react'

// 路由
export type IRouter = {
	path: string
	element: ReactNode
}[]

// 导航路由
export type INavRouter = {
	path: string
	label: string
}[]
