import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '@/pages/Header'
import Login from '@/pages/Login'
import ApplyFor from '@/pages/role/student/ApplyFor'
import ApplyForClassRoom from '@/pages/role/student/ApplyForClassRoom'
import Arrange from '@/pages/role/student/Arrange'
import CurriculaVariable from '@/pages/role/student/CurriculaVariable'
import DropOut from '@/pages/role/student/DropOut'
import Evaluation from '@/pages/role/student/Evaluation'
import Inquiry from '@/pages/role/student/Inquiry'
import Profile from '@/pages/role/student/Profile'
import Registration from '@/pages/role/student/Registration'
import Schedule from '@/pages/role/student/Schedule'
import { IRouter } from '@/types/index'

// 路由
export const element: IRouter = [
	{ path: '/profile', element: <Profile /> },
	{ path: '/curriculaVariable', element: <CurriculaVariable /> },
	{ path: '/dropOut', element: <DropOut /> },
	{ path: '/schedule', element: <Schedule /> },
	{ path: '/registration', element: <Registration /> },
	{ path: '/inquiry', element: <Inquiry /> },
	{ path: '/applyFor', element: <ApplyFor /> },
	{ path: '/evaluation', element: <Evaluation /> },
	{ path: '/arrange', element: <Arrange /> },
	{ path: '/applyForClassRoom', element: <ApplyForClassRoom /> },
	{ path: '/login', element: <Login /> },
]

export default function App () {
	return <BrowserRouter>
		<Routes>
			{
				element.map((route, index) => (
					<Route
						key={ index }
						element={ route.element }
						path={ route.path }
					/>
				))
			}
		</Routes>
		<Header />

	</BrowserRouter>
}
