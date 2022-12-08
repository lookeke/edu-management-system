import { ReactNode } from 'react'

import { RootState } from '@/store/index'
import { useAppSelector } from '@/utils/hooks/index'

import Alert from './Alert'
import AppBar from './AppBar'

export default function Layout ({ children }: { children: ReactNode }) {
	const role = useAppSelector((state: RootState) => state.profile.value.role) // 权限验证

	console.log(role)
	return (
		<>
			{ role === null ? <Alert /> : <AppBar /> }
			{ children }
		</>
	)
}

