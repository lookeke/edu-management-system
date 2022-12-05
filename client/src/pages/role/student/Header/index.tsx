import { Link } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

import { INavRouter } from '@/types'

// 学生路由
const navRouter: INavRouter = [
	{ path: '/profile',label: '个人', },
	{ path: '/curriculaVariable',label: '选课', },
	{ path: '/dropOut',label: '退课', },
	{ path: '/schedule',label: '课程表', },
	{ path: '/registration',label: '考试报名', },
	{ path: '/inquiry',label: '成绩查询', },
	{ path: '/applyFor',label: '缓考申请', },
	{ path: '/evaluation',label: '学生评教', },
	{ path: '/arrange',label: '考试安排', },
	{ path: '/applyForClassRoom',label: '教室申请', },
	{ path: '/login',label: '登录', },
]
export default function Header () {
	const navigate = useNavigate()
	return (
		<>
			{
				navRouter.map((link) => (
					<Link
						key={ link.label }
						component={ NavLink }
						sx={{
							mx: '5px'
						} }
						to={ link.path }
						onClick={ () => navigate(link.path) }
					>{ link.label }
					</Link>
				))
			}
		</>
	)
};
