import { Box, Paper, styled } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { useQuery } from '@tanstack/react-query'

import { RootState } from '@/store'
import { useAppSelector } from '@/utils/hooks'

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: 'center',
	width: '200px',
	height: '100px',
	border: '1px solid #999',
	lineHeight: '100px',
}))

export default function Profile () {
	const { name, role } = useAppSelector((state: RootState) => state.profile.value)
	console.log(name)
	const { data, isLoading } = useQuery(['profile'], () => {
		return fetch(`${ import.meta.env.VITE_APP_USER_URL }/${ name }&role=${ role}`, {
			headers: { 'Content-Type': 'application/json' },
		})
			.then(async (res) => {
				const profile = await res.json()
				console.log(profile)

				return profile
			})
			.catch((error) => {
				return error
			})
	})

	if (isLoading) {
		return <strong>Loading</strong>
	}
	if (!data) {
		return <strong>Error</strong>
	}

	return (
		<Box
			sx={ {
				mt: '50px',
			} }
		>
			<Grid2 container>
				<Grid2 elevation={ 3 } xs={ 4 }>
					<Item>text</Item>
				</Grid2>

			</Grid2>
		</Box>
	)
}

