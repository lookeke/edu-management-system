import { Alert, AlertTitle, Button } from '@mui/material'
import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toggleRole } from '@/features/user/profile'
import { RootState } from '@/store/index'
import { useAppDispatch, useAppSelector } from '@/utils/hooks/index'

// import Alert from './Alert'
import AppBar from './AppBar'

export default function Layout({ children }: { children?: ReactNode }) {
	const { role, name } = useAppSelector((state: RootState) => state.profile.value) // 权限验证
	const [show, setShow] = useState<boolean>(false) // 关闭按钮
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	switch (role) {
		case 0:
		case 1:
		case 2:
			return (
				<>
					{!show && <Alert onClose={() => setShow(true)}>欢迎您, {name}</Alert>}
					<AppBar />
				</>
			)
		case 3:
			return <>{children}</>
		default:
			return (
				<Alert severity="info">
					<AlertTitle>提示</AlertTitle>
					你还没有登录,请
					<Button
						onClick={() => {
							dispatch(toggleRole(3))
							navigate('login')
						}}
					>
						登录
					</Button>
				</Alert>
			)
	}
}
