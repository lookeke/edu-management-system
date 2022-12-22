import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Box, TextField } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { ChangeEvent, useState } from 'react'
import { Simulate } from 'react-dom/test-utils'
import { useNavigate } from 'react-router-dom'

import student from '@/assets/images/团队-1.svg'
import defaultAvatar from '@/assets/images/头像-默认.svg'
import { pwdVerifyRex, usrVerifyRex } from '@/config/verify'
import { encrypt } from '@/utils/encrypt'
import { useAppDispatch } from '@/utils/hooks/index'

const LoginSubmit = ({
	usr,
	pwd,
	loading,
	setLoading,
	setLoadingIndicator,
	setErrorStatus,
}: {
	usr: string
	pwd: string
	loading: boolean
	setLoading: (boolean: boolean) => void
	setLoadingIndicator: (statusText: string) => void
	setErrorStatus: (status: boolean) => void
}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const getProfile = (usr: string, pwd: string, setLoading: (boolean: boolean) => void) => {
		fetch(import.meta.env.VITE_APP_PROFILE_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${ window.localStorage.getItem('token') }` },
		}).then(async (res) => {
			if (res.status > 401) {
				throw new Error('网络请求出错!')
			}
			// token过期, 重新请求token
			if (res.status === 401) {
				fetch(import.meta.env.VITE_APP_USER_URL, {
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ userId: usr, password: encrypt(pwd) }),
				}).then(async (res) => {
					const token : { access_token:string } = await res.json()
					token.access_token && localStorage.setItem('token',token.access_token)
				}).catch((error) =>{
					throw new Error('请求token失败! 服务器错误', error)
				})
			}
			const userInfo: { access_token: string, role: number } = await res.json()
			console.log(userInfo)
			return userInfo.role
		}).then((role) => {
			fetch(import.meta.env.VITE_APP_ROUTER_URL, {
				method: 'POST',
				headers: { 'Authorization': `Bearer ${ window.localStorage.getItem('token') }` },
				body: JSON.stringify({ access_token: window.localStorage.getItem('token'), role }),
			})
				.then((res) => {
					const profile = res.json()
					console.log(profile)
				})
		}).catch(err => {
			console.error(err.message)
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
	const [loadingIndicator, setLoadingIndicator] = useState<string>('网络链接失败!') // 登录按钮的登录状态文字提示
	const [errorStatus, setErrorStatus] = useState<boolean>(false) // 登录异常的状态

	// 账号校验
	const usrHandle = (event: string) => {
		setUsr(event)
		setUsrErr(true)
		setUsrInputStatus(true)
		setUsrHelperText('4-16位数字字母!')
		setUsrHelperText('4-16位数字字母!')

		// 校验成功
		if (usrVerifyRex.test(event)) {
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
		if (pwdVerifyRex.test(event)) {
			setPwdErr(false)
			setPwdHelperText('✔')
		}
	}

	return (
		<Box>
			{ errorStatus ? (
				<Alert severity="error">
					<AlertTitle>错误!</AlertTitle>
					<Typography>{ loadingIndicator }</Typography>
				</Alert>
			) : null }

			<Box
				sx={ {
					width: '1080px',
					height: '80vh',
					columnCount: 2,
					mx: 'auto',
				} }
			>
				<Box
					alt="插画"
					component="img"
					src={ student }
					sx={ {
						maxWidth: '500px',
						height: '80vh',
					} }
				/>

				<Box
					sx={ {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						height: '80vh',
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
							setErrorStatus={ setErrorStatus }
							setLoading={ setLoading }
							setLoadingIndicator={ setLoadingIndicator }
							usr={ usr }
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
