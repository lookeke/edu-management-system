import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import student from '@/assets/images/团队-1.svg'
import defaultAvatar from '@/assets/images/头像-默认.svg'
import { pwdVerifyRex, usrVerifyRex } from '@/config/verify'
import { createRouter } from '@/features/router/index'
import { updateUserInfo } from '@/features/user/profile'
import { useAppDispatch } from '@/utils/hooks/index'

const LoginSubmit = ({
	usr,
	pwd,
	loading,
	setLoading,
}: {
	usr: string
	pwd: string
	loading: boolean
	setLoading: (boolean: boolean) => void
}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const getProfile = (usr: string, pwd: string, setLoading: (boolean: boolean) => void) => {
		fetch(`${ import.meta.env.VITE_APP_USER_URL }`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: usr, password: pwd }),
		})
		.then(async(res) => {
			const profile = await res.json()
			console.log(profile)
			dispatch(updateUserInfo(profile))
			setLoading(false)
			return profile.role
		})
		.then((role) => {
			fetch(`${ import.meta.env.VITE_APP_ROUTER_URL }`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ role }),
			})
			.then(async(res) => {
				const routes = await res.json()
				dispatch(createRouter(routes))
			})
		})
		.then(() => {
			navigate('/')
		})
		.catch((err) => {
			console.info(err)
		})
	}
	return (
		<LoadingButton
			loading={ loading }
			loadingIndicator="登录中..."
			sx={ { width: '200px' } }
			variant="outlined"
			onClick={ () => {
				setLoading(true)
				getProfile(usr, pwd, setLoading)
			} }
		>
			Submit
		</LoadingButton>
	)
}

export default function Login () {
	const [usr, setUsr] = useState<string>('')
	const [pwd, setPwd] = useState<string>('')
	const [usrErr, setUsrErr] = useState<boolean>(false) // 账号是否校验错误
	const [pwdErr, setPwdErr] = useState<boolean>(false) // 密码是否校验错误
	const [usrInputStatus, setUsrInputStatus] = useState<boolean>(false) // 账号是否校验错误的边框提示
	const [pwdInputStatus, setPwdInputStatus] = useState<boolean>(false) // 密码是否校验错误的边框提示
	const [usrHelperText, setUsrHelperText] = useState<string>('请输入账号') // 账号是否校验错误的文字提示
	const [pwdHelperText, setPwdHelperText] = useState<string>('请输入账号') // 密码是否校验错误的文字提示
	const [loading, setLoading] = useState<boolean>(false) // 登录按钮的进度提示

	// 账号校验
	const usrHandle = (event: string) => {
		setUsr(event)
		setUsrErr(true)
		setUsrInputStatus(true)
		setUsrHelperText('4-16位数字字母!')
		setUsrHelperText('4-16位数字字母!')

		// 校验成功
		if (usrVerifyRex.test(event)){
			setUsrErr(false)
			setUsrHelperText('✔')
		}
	}

	// 密码校验
	const pwdHandle = (event: string) => {
		setPwdErr(true)
		setPwdInputStatus(true)
		setPwdHelperText('至少6位数字！')
		setPwd(event)

		// 校验成功
		if (pwdVerifyRex.test(event)){
			setPwdErr(false)
			setPwdHelperText('✔')
		}
	}

	return (
		<Box>
			<Box
				sx={ {
					columnCount: 2,
				} }
			>
				<Box
					alt="插画"
					component="img"
					src={ student }
					sx={ {
						maxWidth: '600px',
						height: '100vh',
					} }
				/>

				<Box
					sx={ {
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexDirection: 'column',
					} }
				>
					<Avatar
						alt="defaultAvatar"
						src={ defaultAvatar }
						sx={ {
							width: '150px',
							height: '150px',
							borderRadius: '7px',
						} }
					/>

					<TextField
						color={ usrInputStatus ? 'success' : 'warning' }
						error={ usrErr }
						helperText={ usrHelperText }
						label="账号/邮箱"
						sx={ {
							width: '350px',
						} }
						variant="standard"
						onChange={ (event: ChangeEvent<HTMLInputElement>) => usrHandle(event.currentTarget.value) }
					/>

					<TextField
						color={ pwdInputStatus ? 'success' : 'warning' }
						error={ pwdErr }
						helperText={ pwdHelperText }
						label="密码"
						sx={ {
							mt: '50px',
							width: '350px',
						} }
						type="password"
						variant="standard"
						onChange={ (event: ChangeEvent<HTMLInputElement>) => pwdHandle(event.currentTarget.value) }
					/>
					<Box
						sx={ {
							mt: '60px',
							columnCount: 2,
						} }
					>
						<Typography>忘记密码?</Typography>
						<LoginSubmit
							loading={ loading }
							pwd={ pwd }
							setLoading={ setLoading }
							usr={ usr }
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
