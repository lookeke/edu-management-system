import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { RootState } from '@/store/index'
import { useAppSelector } from '@/utils/hooks/index'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
export default function AppBarComponent() {
	const [anchorElNav, setAnchorElNav] = useState<null | Element>(null)
	const [profileElNav, setProfileElNav] = useState<null | Element>(null)
	const navigate = useNavigate()

	// 跳转到路由
	const toggleRouter = (path: string) => {
		console.log(path)
		navigate(path)
	}

	// md响应式状态下: 点击图标打开nav路由列表
	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	// md响应式状态下: 点击图标打开用户路由列表
	const handleOpenProfileMenu = (event: MouseEvent<HTMLElement>) => {
		setProfileElNav(event.currentTarget)
	}

	// md响应式状态下: 点击空白处关闭nav路由列表
	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	// md响应式状态下: 点击空白处关闭头像路由链接列表
	const handleCloseProfileMenu = () => {
		setProfileElNav(null)
	}

	const pages = useAppSelector((state: RootState) => state.router.value.router.items)
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
						variant="h6"
					>
						教务管理系统
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							aria-controls="menu-appbar"
							aria-haspopup="true"
							aria-label="account of current user"
							color="inherit"
							size="large"
							onClick={handleOpenNavMenu}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							keepMounted
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							id="menu-appbar"
							open={Boolean(anchorElNav)}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							onClose={handleCloseNavMenu}
						>
							{pages?.map((page) => (
								<MenuItem
									key={page.label}
									onClick={() => toggleRouter(page.path)}
								>
									<Typography textAlign="center">{page.label}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
						variant="h5"
					>
						教务管理系统
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages?.map((page) => (
							<Button
								key={page.label}
								sx={{ my: 2, color: 'white', display: 'block' }}
								onClick={() => toggleRouter(page.path)}
							>
								{page.label}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								sx={{ p: 0 }}
								onClick={handleOpenProfileMenu}
							>
								<Avatar
									alt="Remy Sharp"
									src=""
								/>
							</IconButton>
						</Tooltip>
						<Menu
							keepMounted
							anchorEl={profileElNav}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							id="menu-appbar"
							open={Boolean(profileElNav)}
							sx={{ mt: '45px' }}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							onClose={handleCloseProfileMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
