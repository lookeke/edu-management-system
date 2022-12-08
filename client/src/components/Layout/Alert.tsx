import { AlertTitle } from '@mui/lab'
import { Alert } from '@mui/material'

export default function AlertComponent () {
	return (
		<Alert severity="info">
				<AlertTitle>提示</AlertTitle>
				你还没有登录,请 <a href="/login">登录</a>
			</Alert>
	)
};
